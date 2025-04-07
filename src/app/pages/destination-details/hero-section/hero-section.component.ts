import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ShareQRModelComponent } from '../share-qr-model/share-qr-model.component';
import { AiAudioModelComponent } from '../ai-audio-model/ai-audio-model.component';
import { FontAwesomeModule,FaIconLibrary  } from '@fortawesome/angular-fontawesome';

import { 
  faBars, 
  faTimes, 
  faLandmark, 
  faMountain, 
  faPray, 
  faOm, 
  faCamera, 
  faFileAlt, 
  faVolumeUp, 
  faMapMarkerAlt,
  faParking,
  faUtensils,
  faCalculator,
  faShieldAlt,
  faMedkit
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports: [CommonModule, ShareQRModelComponent, AiAudioModelComponent,
     FontAwesomeModule]
})
export class HeroSectionComponent implements OnInit {
  isMenuOpen = false;

  showModal = false;
  shareUrl = 'https://your-link.com'; // Provide actual link
  showAudioModal = false;

  bars = faBars;
  times = faTimes;
  landmark = faLandmark;
  mountain = faMountain;
  pray = faPray;
  om = faOm;
  camera = faCamera;
  fileAlt = faFileAlt;
  volumeUp = faVolumeUp;
  mapMarker = faMapMarkerAlt;
  parking = faParking;
  utensils = faUtensils;
  calculator = faCalculator;
  shield = faShieldAlt;
  medkit = faMedkit;

  constructor(library: FaIconLibrary) {
    library.addIcons(this.bars, this.times, this.landmark, this.mountain, this.pray, 
      this.om, this.camera, this.fileAlt, this.volumeUp, this.mapMarker, this.parking, 
      this.utensils, this.calculator, this.shield, this.medkit);
  }
  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  scrollToSection(id:string) {
    this.isMenuOpen = false;
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  
}
