// audio-player-modal.component.ts
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceModelService } from '../../../services/voice-model.service';

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
   
   showModal$= this.voiceModelService.showModel$

   languages = this.voiceModelService.getAudioLanguage()

   selectedLanguage = this.languages.english;
  

 audio = new Audio('');

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
    this.audio.addEventListener('timeupdate', () => {
      this.audioSettings.currentTime = this.audio.currentTime;
      this.cdr.detectChanges();
    });
  }
  
  ngOnInit() {
    // Set the initial volume from audio settings
    this.audio.volume = this.audioSettings.volume;
    this.audio.preload = 'none';
  
    // Once metadata is loaded, update the duration in settings
    this.audio.addEventListener('loadedmetadata', () => {
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

    //when the audio is loading, show the loading indicator
    this.audio.addEventListener('canplay', () => {
      this.audioSettings.showLoadingIndicator = false;
      this.audioSettings.showError = false;
      this.cdr.detectChanges();
    });

    //when some error occurs, show the error message
    this.audio.addEventListener('error', () => {
      this.audioSettings.showLoadingIndicator = false;
      this.audioSettings.showError = true;
      this.cdr.detectChanges();
    });
  }
  
  toggleAudioGuideModel() {
    if (!this.audio.src || this.audio.src !== this.selectedLanguage.audio) {
      this.audio.src = this.selectedLanguage.audio;
      this.audio.load(); 
    }
    
    this.voiceModelService.toggleModel();
    const selectEl = document.getElementById('audioInput') as HTMLSelectElement;
    selectEl.value = this.audioSettings.selectedLang;
    this.cdr.detectChanges();
   }


  togglePlay() {
    if (this.audioSettings.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  

  skip(seconds: number) {
    this.audio.currentTime += seconds;
  }

  adjustVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.audioSettings.volume = parseFloat(input.value);
    this.audio.volume = this.audioSettings.volume;
  }

  onSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    const seekTime = parseFloat(input.value);
    this.audio.currentTime = seekTime;
    this.audioSettings.currentTime = seekTime;
    this.cdr.detectChanges();
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
      if (this.audioSettings.isPlaying) {
        this.audio.play();
      }
    }
  }


  getBarHeight(): number {
    if (!this.audioSettings.isPlaying) return 4;
    return Math.random() * 20 + 4;
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }


}
