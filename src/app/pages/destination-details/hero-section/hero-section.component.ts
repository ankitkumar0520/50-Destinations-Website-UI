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
export class HeroSectionComponent implements OnInit {
  isMenuOpen = false;

  showModal = false;
  shareUrl = 'https://your-link.com'; // Provide actual link
  showAudioModal = false;

  menuItems = [
    { id: 'points-of-interest', name: 'Points of Interest', icon: 'map-marker-alt' },
    { id: 'parking', name: 'Parking', icon: 'parking' },
    { id: 'eateries', name: 'Eateries', icon: 'utensils' },
    { id: 'atm', name: 'ATM', icon: 'money-bill-wave' },
    { id: 'police-services', name: 'Police Services', icon: 'shield-alt' },
    { id: 'hospital-services', name: 'Hospital Services', icon: 'hospital' }
  ];

  activeSection: string = 'points-of-interest';
  isBrowser: boolean;
  navbarHeight = 70 + 64; // Fixed navbar height
showAside = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkActiveSection();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.isBrowser) {
      this.checkActiveSection();
    }
  }

  checkActiveSection() {
    if (!this.isBrowser) return;

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    for (const item of this.menuItems) {
      const element = document.getElementById(item.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop - this.navbarHeight && scrollPosition < offsetTop + offsetHeight - this.navbarHeight) {
          this.activeSection = item.id;
          break;
        }
      }
    }
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
