// audio-player-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ai-audio-model',
  imports: [CommonModule],
  templateUrl: './ai-audio-model.component.html',
  styleUrl: './ai-audio-model.component.css',
  standalone: true, 
})
export class AiAudioModelComponent {



  @Output() close = new EventEmitter<void>();

  audio = new Audio('assets/audio/sample-en.mp3');
  isPlaying = false;
  volume = 0.7;
  currentTime = 0;
  duration = 0;
  selectedLang = 'en';
  languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' }
  ];


  ngOnInit() {
    this.audio.volume = this.volume;
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
      this.duration = this.audio.duration;
    });
  }

  togglePlay() {
    this.isPlaying ? this.audio.pause() : this.audio.play();
    this.isPlaying = !this.isPlaying;
  }

  skip(seconds: number) {
    this.audio.currentTime += seconds;
  }

  adjustVolume(event: any) {
    this.volume = event.target.value;
    this.audio.volume = this.volume;
  }

  onSeek(event: any) {
    this.audio.currentTime = event.target.value;
  }

  formatTime(t: number): string {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  closeModal() {
    this.audio.pause();
    this.close.emit();
  }

  changeLanguage(lang: string) {
    this.selectedLang = lang;
    // Add your language change logic here
  }

  getBarHeight(): number {
    return Math.random() * 20 + 4;
  }



}
