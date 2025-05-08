import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceModelService {

constructor() { }

  private showModelSubject = new BehaviorSubject<boolean>(false);
  showModel$ = this.showModelSubject.asObservable();

  showModel() {
    this.showModelSubject.next(true);
  }

  hideModel() {
    this.showModelSubject.next(false);

  }

  toogleModel() {
    this.showModelSubject.next(!this.showModelSubject.value);
  }

  getAudioLanguage() {
    return    {
      english: {
        language:'English',
        languageCode:'en',
        audio: 'https://raw.githubusercontent.com/ankitkumar0520/audio-samples/main/ElevenLabs_Sarah_Rumtek_English_Audio.mp3'
      },
      hindi: {
        language:'हिन्दी',
        languageCode:'hi',
        audio: 'https://raw.githubusercontent.com/ankitkumar0520/audio-samples/main/ElevenLabs_Sarah_Rumtek_Hindi_Audio.mp3'
      },
      nepali: {
        language:'नेपाली',
        languageCode:'ne',
        audio: 'https://raw.githubusercontent.com/ankitkumar0520/audio-samples/main/ElevenLabs_Sarah_Rumtek_Nepali_Audio.mp3'
      }
    };
  }

}
