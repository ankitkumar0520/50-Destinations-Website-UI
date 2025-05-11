import { Component, HostListener, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
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
  route = inject(ActivatedRoute);
  destinationService = inject(DestinationService);

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

    //get destination by slug from url, just call this function in ngoninit , then subscribe to the destination service varible as destination$   , if slug is not found then redirect to home 
    this.route.params.subscribe(params => {
      if(params['slug']){
        const slug = params['slug'];
        console.log('ID from URL:', slug);
        this.destinationService.getDestinationbySlug(slug);
      }
    });


  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.isBrowser) {
      this.checkActiveSection();
    }
  }

  checkActiveSection() {
    // Ensure this function is running only on the client-side (browser)
    if (typeof window === 'undefined' || !this.isBrowser) return;
  
    try {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
      // Safeguard against undefined or empty menuItems
      if (!Array.isArray(this.menuItems) || this.menuItems.length === 0) return;
  
      for (const item of this.menuItems) {
        if (!item.id) continue; // Skip items without an id
  
        const element = document.getElementById(item.id);
  
        // Ensure the element exists before accessing its properties
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
  
          // Check if the scroll position is within the element's range
          if (scrollPosition >= offsetTop - this.navbarHeight && scrollPosition < offsetTop + offsetHeight - this.navbarHeight) {
            this.activeSection = item.id;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Error in checkActiveSection:', error);
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
