import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { GalleryDescriptionComponent } from './gallery-description/gallery-description.component';
import { PointsOfInterestComponent } from './points-of-interest/points-of-interest.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { PoliceHospitalComponent } from './police-hospital/police-hospital.component';
import { ShopsComponent } from './shops/shops.component';
import { AccomodationEateryComponent } from './accomodation-eatery/accomodation-eatery.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AiAudioModelComponent } from './ai-audio-model/ai-audio-model.component';
@Component({
  selector: 'app-destination-main',
  standalone: true,
  templateUrl: './destination-main.component.html',
  styleUrls: ['./destination-main.component.css'],
  imports: [
    CommonModule,
    HeroSectionComponent,
    GalleryDescriptionComponent,
    PointsOfInterestComponent,
    FacilitiesComponent,
    PoliceHospitalComponent,
    ShopsComponent,
    AccomodationEateryComponent,
    MapComponent,
    AiAudioModelComponent,
  ],
})
export class DestinationMainComponent implements OnInit {
  showModal = false;
  shareUrl = 'https://your-link.com';

  menuItems = [
    { id: 'about-section', name: 'About', icon: 'info-circle' },
    { id: 'galleries-section', name: 'Galleries', icon: 'images' },
    { id: 'points-of-interest-section', name: 'Point of Interest', icon: 'map-marker-alt' },
    { id: 'facilities-services-section', name: 'Facilities & Services', icon: 'concierge-bell' },
    { id: 'safety-emergency-section', name: 'Safety & Emergency', icon: 'shield-alt' },
    { id: 'shops-section', name: 'Shops', icon: 'shopping-bag' },
    { id: 'accommodation-eatery-section', name: 'Accommodation & Eatery', icon: 'bed' },
    { id: 'guide-map-section', name: 'Guide & Map', icon: 'map' }
  ];
  navbarHeight = 70; // Fixed navbar height
  activeSection: string = 'points-of-interest';
  isBrowser: boolean;
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
