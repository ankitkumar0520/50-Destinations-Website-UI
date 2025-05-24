// audio-player-modal.component.ts
import {
  Component,
  ChangeDetectorRef,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceModelService } from '../../../services/voice-model.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DestinationService } from '../../../services/destination.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

interface AudioLanguage {
  languageCode: string;
  audiosrc: string;
}

@Component({
  selector: 'app-ai-audio-model',
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-audio-model.component.html',
  styleUrl: './ai-audio-model.component.css',
  standalone: true,
})
export class AiAudioModelComponent implements OnInit, OnDestroy {
  Math: Math = Math;
  voiceModelService = inject(VoiceModelService);
  destinationService = inject(DestinationService);
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);

  private destroy$ = new Subject<void>();
  slug: string = '';

  showModal: boolean = false;

  audioList: AudioLanguage[] = [];

  audio = new Audio();

  audioSettings = {
    title: '',
    volume: 0.8,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    showLoadingIndicator: true,
    showError: false,
    selectedCode: 'en',
    selectAudioSrc: '',
    bufferedPercent: 0,
  };

  constructor() {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('slug')) {
        this.slug = params.get('slug') || '';
        this.getAudioList();
      }
    });

    // Subscribe to showModel$ observable to control modal visibility and audio source
    this.handleModelVisibility();

    // Initialize event listeners for audio
    this.initializeEventListeners();
  }

  getAudioList() {
    this.apiService
      .get(`LandingPage/GetAllAudioDetailsByDestinationSlug?slug=${this.slug}`)
      .subscribe({
        next: (res: any) => {
          if (res && res.length > 0) {
            this.audioList = res.map((item: any) => ({
              languageCode: item.language,
              audiosrc: item.audio_file_path,
            }));
          } else {
            this.audioSettings.showError = true;
            this.audioSettings.showLoadingIndicator = false;
          }
        },
        error: (err: any) => {
          this.audioSettings.showError = true;
          this.audioSettings.showLoadingIndicator = false;
          console.log(err);
        },
      });
  }

  handleAudio() {
    const newLanguageSrc = this.audioList.find(
      (l) => l.languageCode == this.audioSettings.selectedCode
    )?.audiosrc;
    if (newLanguageSrc) {
      // Reset buffering state
      this.audioSettings.bufferedPercent = 0;
      
      //set audio source
      this.audioSettings.selectAudioSrc = newLanguageSrc;

      //set audio source
      this.audio.src = this.audioSettings.selectAudioSrc;

      //load audio
      this.audio.load();

      //play audio
      if (!this.audioSettings.showLoadingIndicator) {
        this.audio.play();
      }
    }
  }

  getBarHeight(): number {
    if (!this.audioSettings.isPlaying) return 4;
    return Math.random() * 20 + 4;
  }

  // Subscribes to showModel$ observable to control modal visibility and audio source
  handleModelVisibility() {
    this.voiceModelService.showModel$
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when component is destroyed
      .subscribe({
        next: (show) => {
          this.showModal = show;

          if (show) {
            if (!this.audioSettings.isPlaying) {
              this.handleAudio(); // update audio language on modal open
            }

            document.body.style.overflow = 'hidden'; // Prevent background scrolling when modal is open
          } else {
            document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
          }

          this.cdr.detectChanges(); // Trigger UI update
        },
        error: (err) => {
          console.error('Error in showModel$ subscription:', err);
        },
      });
  }

  // Lifecycle hook to clean up when the component is destroyed
  ngOnDestroy() {
    this.destroy$.next(); // Signal all takeUntil() observables to complete
    this.destroy$.complete(); // Complete the destroy$ subject to free memory

    // Stop and reset audio
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = '';

    // Restore scroll in case modal was open
    document.body.style.overflow = 'auto';

    // Close modal
    this.showModal = false;
  }

  togglePlay() {
    if (this.audioSettings.isPlaying) {
      this.audio.pause();
    } else {
      if (!this.audioSettings.showLoadingIndicator) {
        this.audio.play();
      }
    }
  }

  skip(seconds: number) {
    if (this.audioSettings.isPlaying) {
      this.audio.currentTime += seconds;
    }
  }

  adjustVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.audioSettings.volume = parseFloat(input.value);
    this.audio.volume = this.audioSettings.volume;
  }

  onSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    const seekTime = parseFloat(input.value);
    if (this.audioSettings.isPlaying) {
      this.audio.currentTime = seekTime;
      this.audioSettings.currentTime = seekTime;
      this.cdr.detectChanges();
    }
  }

  formatTime(t: number): string {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60)
      .toString()
      .padStart(2, '0');
    return `${min}:${sec}`;
  }

  closeModal() {
    this.voiceModelService.hideModel();
  }

  toogleModel() {
    this.voiceModelService.toogleModel();
  }

  initializeEventListeners() {
    // Set the initial volume from audio settings
    this.audio.volume = this.audioSettings.volume;
    this.audio.preload = 'none';

    this.audio.addEventListener('timeupdate', () => {
      this.audioSettings.currentTime = this.audio.currentTime;
      this.cdr.detectChanges();
    });

    // When audio starts loading, reset buffer
    this.audio.addEventListener('loadstart', () => {
      console.log('Audio started loading');
      this.audioSettings.showLoadingIndicator = true;
      this.audioSettings.bufferedPercent = 0;
      this.cdr.detectChanges();
    });

    // Once metadata is loaded, update the duration in settings
    this.audio.addEventListener('canplaythrough', () => {
      console.log('Audio metadata loaded successfully');
      this.audioSettings.duration = this.audio.duration;
      this.audioSettings.showError = false;
      this.audioSettings.showLoadingIndicator = false;
      this.audioSettings.bufferedPercent = 100;
      this.cdr.detectChanges();
    });

    // When audio starts playing, update isPlaying flag
    this.audio.addEventListener('play', () => {
      console.log('Audio started playing');
      this.audioSettings.isPlaying = true;
      this.cdr.detectChanges();
    });

    // When audio is paused, update isPlaying flag
    this.audio.addEventListener('pause', () => {
      console.log('Audio paused');
      this.audioSettings.isPlaying = false;
      this.cdr.detectChanges();
    });

    // When audio ends, reset isPlaying and currentTime
    this.audio.addEventListener('ended', () => {
      console.log('Audio ended');
      this.audioSettings.isPlaying = false;
      this.audioSettings.currentTime = 0;
      this.cdr.detectChanges();
    });

    // When some error occurs, decide whether to show a loader or error
    this.audio.addEventListener('error', (e) => {
      // console.error('Audio error:', e);
      if (
        !this.audioSettings.selectAudioSrc ||
        this.audioSettings.selectAudioSrc.trim() === ''
      ) {
        this.audioSettings.showLoadingIndicator = true;
        this.audioSettings.showError = false;
      } else {
        this.audioSettings.showLoadingIndicator = false;
        this.audioSettings.showError = true;
      }
      this.cdr.detectChanges();
    });

    this.audio.addEventListener('progress', () => {
      if (this.audio.buffered.length > 0) {
        const bufferedEnd = this.audio.buffered.end(this.audio.buffered.length - 1);
        const duration = this.audio.duration;
    
        if (duration > 0) {
          const newBufferedPercent = (bufferedEnd / duration) * 100;
          if (Math.abs(newBufferedPercent - this.audioSettings.bufferedPercent) > 1) {
            this.audioSettings.bufferedPercent = newBufferedPercent;
            this.cdr.detectChanges();
          }
        }
      }
    });

    // Add waiting event listener
    this.audio.addEventListener('waiting', () => {
      this.audioSettings.showLoadingIndicator = true;
      this.cdr.detectChanges();
    });

    // Add canplay event listener
    this.audio.addEventListener('canplay', () => {
      this.audioSettings.showLoadingIndicator = false;
      this.cdr.detectChanges();
    });
  }
}
