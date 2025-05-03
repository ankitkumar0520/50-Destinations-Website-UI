// audio-player-modal.component.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceModelService } from '../../../services/voice-model.service';
import { skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ai-audio-model',
  imports: [CommonModule],
  templateUrl: './ai-audio-model.component.html',
  styleUrl: './ai-audio-model.component.css',
  standalone: true, 
})
export class AiAudioModelComponent {

   Math:Math = Math;   

   voiceModelService= inject(VoiceModelService)
   private destroy$ = new Subject<void>();
   
   showModal:boolean = false;

   languages = this.voiceModelService.getAudioLanguage()

   selectedLanguage = this.languages.english;
  

   audio = new Audio();

 audioSettings={
  volume:0.8,
  currentTime:0,
  duration:0,
  isPlaying:false,
  showLoadingIndicator:true,
  showError:false,
  selectedLang:this.selectedLanguage.languageCode,
}



  constructor(private cdr: ChangeDetectorRef) {
  
  }
  
  ngOnInit() {
    this.handleModelVisibility();//subscribe to the showModel$ observable

    // Set the initial volume from audio settings
    this.audio.volume = this.audioSettings.volume;
    this.audio.preload = 'none';
  
    this.audio.addEventListener('timeupdate', () => {
      this.audioSettings.currentTime = this.audio.currentTime;
      this.cdr.detectChanges();
    });

    // Once metadata is loaded, update the duration in settings
    this.audio.addEventListener('canplaythrough', () => {
      this.audioSettings.duration = this.audio.duration;
      this.audioSettings.showError = false;
      this.audioSettings.showLoadingIndicator = false;
      this.cdr.detectChanges(); // Trigger change detection to update the UI
    });
  
    // When audio starts playing, update isPlaying flag
    this.audio.addEventListener('play', () => {
      this.audioSettings.isPlaying = true;
      this.cdr.detectChanges();
    });
  
    // When audio is paused, update isPlaying flag
    this.audio.addEventListener('pause', () => {
      this.audioSettings.isPlaying = false;
      this.cdr.detectChanges();
    });
  
    // When audio ends, reset isPlaying and currentTime
    this.audio.addEventListener('ended', () => {
      this.audioSettings.isPlaying = false;
      this.audioSettings.currentTime = 0;
      this.cdr.detectChanges();
    });

      // When some error occurs, decide whether to show a loader or error
    this.audio.addEventListener('error', () => {
      // If no valid audio URL is set yet (intentional empty state)
      if (!this.selectedLanguage.audio || this.selectedLanguage.audio.trim() === '') {
        // Show loading indicator, do NOT show error
        this.audioSettings.showLoadingIndicator = true;
        this.audioSettings.showError = false;
      } else {
        // Audio source was set, but failed to load => show error
        this.audioSettings.showLoadingIndicator = false;
        this.audioSettings.showError = true;
      }

      // Update UI
      this.cdr.detectChanges();
    });

  }
  

  togglePlay() {
      if (this.audioSettings.isPlaying) {
          this.audio.pause();
        } 
        else {
        if(!this.audioSettings.showLoadingIndicator){
          this.audio.play();
        }
    }
  }

  

  skip(seconds: number) {
    if(this.audioSettings.isPlaying){
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
    if(this.audioSettings.isPlaying){
      this.audio.currentTime = seekTime;
      this.audioSettings.currentTime = seekTime;
      this.cdr.detectChanges();
    }
  }

  formatTime(t: number): string {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  closeModal() {
    this.voiceModelService.hideModel();
  }

  changeLanguage(lang: string) {
    this.audioSettings.selectedLang = lang;
    const newLanguage = Object.values(this.languages).find(l => l.languageCode === lang);
    if (newLanguage) {
      this.selectedLanguage = newLanguage;
      this.audio.src = newLanguage.audio;
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
          // Set audio source only if it's not already set or different
          if (!this.audio.src || this.audio.src !== this.selectedLanguage.audio) {
            this.audio.src = this.selectedLanguage.audio;
            this.audio.load(); // Reload audio for new source
            document.body.style.overflow = 'hidden'; // Prevent background scrolling when modal is open
          }
        } else {
          document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
        }

        this.cdr.detectChanges(); // Trigger UI update
      },
      error: (err) => {
        console.error('Error in showModel$ subscription:', err);
      }
    });
}

// Lifecycle hook to clean up when the component is destroyed
ngOnDestroy() {
  this.destroy$.next();      // Signal all takeUntil() observables to complete
  this.destroy$.complete();  // Complete the destroy$ subject to free memory

  // Stop and reset audio
  this.audio.pause();
  this.audio.currentTime = 0;
  this.audio.src = '';

  // Restore scroll in case modal was open
  document.body.style.overflow = 'auto';
}

  
  
  toogleModel(){
    this.voiceModelService.toogleModel();
  }


}
