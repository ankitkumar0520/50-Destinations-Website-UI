import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ShareQRModelComponent } from '../share-qr-model/share-qr-model.component';
import { AiAudioModelComponent } from '../ai-audio-model/ai-audio-model.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports: [
    CommonModule,
    ShareQRModelComponent,
    AiAudioModelComponent,
    FontAwesomeModule,
  ],
})
export class HeroSectionComponent {
  isMenuOpen = false;

  showModal = false;
  shareUrl = 'https://your-link.com';
  showAudioModal = false;

  activeSection: string = 'points-of-interest';
  isBrowser: boolean;
  navbarHeight = 70;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  scrollTo(id: string) {
    if (!this.isBrowser) return;

    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - this.navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      this.activeSection = id;
    }
  }
}
