// audio-player-modal.component.ts
import { Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { title } from 'process';


@Component({
  selector: 'app-ai-audio-model',
  imports: [CommonModule],
  templateUrl: './ai-audio-model.component.html',
  styleUrl: './ai-audio-model.component.css',
  standalone: true, 
})
export class AiAudioModelComponent {
  Object = Object;

  languages = {
    english: {
      language:'English',
      languageCode:'en',
      title: 'Rumtek Monastery',
      image: 'assets/Images/rumtek-monastry/rumtek5.jpeg',
      audio: 'assets/Audio/Rumtek-Monastry/ElevenLabs_Sarah_Rumtek_English_Audio.mp3'
    },
    hindi: {
      language:'हिन्दी',
      languageCode:'hi',
      title: 'रुमटेक मठ',
      image: 'assets/Images/rumtek-monastry/rumtek5.jpeg',
      audio: 'assets/Audio/Rumtek-Monastry/ElevenLabs_Sarah_Rumtek_Hindi_Audio.mp3'
    },
    nepali: {
      language:'नेपाली',
      languageCode:'ne',
      title: 'रुमटेक गुम्बा',
      image: 'assets/Images/rumtek-monastry/rumtek5.jpeg',
      audio: 'assets/Audio/Rumtek-Monastry/ElevenLabs_Sarah_Rumtek_Nepali_Audio.mp3'
    }
  };

  selectedLanguage = this.languages.english;
  
  @Output() close = new EventEmitter<void>();

  audio = new Audio(this.selectedLanguage.audio);
  isPlaying = false;
  volume = 0.7;
  currentTime = 0;
  duration = 0;
  selectedLang = this.selectedLanguage.languageCode;

  constructor(private cdr: ChangeDetectorRef) {
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.audio.volume = this.volume;
    
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
      this.cdr.detectChanges();
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.cdr.detectChanges();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.cdr.detectChanges();
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.currentTime = 0;
      this.cdr.detectChanges();
    });
  }

  get currentLanguageData() {
    return Object.values(this.languages).find((lang: any) => lang.languageCode === this.selectedLang);
  }

  togglePlay() {
    if (this.isPlaying) {
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
    this.volume = parseFloat(input.value);
    this.audio.volume = this.volume;
  }

  onSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    const seekTime = parseFloat(input.value);
    this.audio.currentTime = seekTime;
    this.currentTime = seekTime;
    this.cdr.detectChanges();
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
    const newLanguage = Object.values(this.languages).find(l => l.languageCode === lang);
    if (newLanguage) {
      this.selectedLanguage = newLanguage;
      this.audio.src = newLanguage.audio;
      if (this.isPlaying) {
        this.audio.play();
      }
    }
  }


  getBarHeight(): number {
    if (!this.isPlaying) return 4;
    return Math.random() * 20 + 4;
  }



}
