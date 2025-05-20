import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  inject,
  OnDestroy,
} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
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
  private destroy$ = new Subject<void>();

  menuItems = [
    { id: 'about-section', name: 'About', icon: 'info-circle' },
    { id: 'galleries-section', name: 'Galleries', icon: 'images' },
    {
      id: 'points-of-interest-section',
      name: 'Point of Interest',
      icon: 'map-marker-alt',
    },
    {
      id: 'facilities-services-section',
      name: 'Facilities & Services',
      icon: 'concierge-bell',
    },
    {
      id: 'safety-emergency-section',
      name: 'Safety & Emergency',
      icon: 'shield-alt',
    },
    { id: 'shops-section', name: 'Shops', icon: 'shopping-bag' },
    {
      id: 'accommodation-eatery-section',
      name: 'Accommodation & Eatery',
      icon: 'bed',
    },
    { id: 'guide-map-section', name: 'Guide & Map', icon: 'map' },
  ];

  filteredMenuItems: any[] = [];
  
  navbarHeight = 70; // Fixed navbar height
  activeSection: string = 'points-of-interest';
  isBrowser: boolean;
  showAside = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Initialize with all menu items
    this.filteredMenuItems = [...this.menuItems];
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkActiveSection();
    }

    this.destinationService.getDestinationbySlug(this.route.snapshot.params['slug']);

    // Subscribe to destination updates
    this.destinationService.destination$
      .pipe(
        takeUntil(this.destroy$),
        filter(destination => !!destination.data) // Only process when we have data
      )
      .subscribe(destination => {
        this.updateMenuItems(destination);
      });
  }


  private updateMenuItems(destination: any) {
    console.log('=== Starting Menu Items Update ===');
    console.log('Destination Data:', destination?.data);
    
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
    
    this.filteredMenuItems = this.menuItems.filter(item => {
      let result = false;

      switch(item.id) {
        case 'about-section':
          result = true;
          break;

        case 'galleries-section':
          const hasMedia = destination?.data?.media && destination.data.media.length > 0;
          result = hasMedia;
          break;

        case 'points-of-interest-section':
          const poiEntities = destination?.data?.entities?.filter((entity: any) => 
            entity.sectorId === 3 || normalize(entity.sectorName || '') === 'point of interest'
          );
          result = !!poiEntities?.length;
          break;

        case 'facilities-services-section':
          const facilityEntities = destination?.data?.entities?.filter((entity: any) => 
            entity.sectorId === 2 || normalize(entity.sectorName || '') === 'facilities & services'
          );
          result = !!facilityEntities?.length;
          break;

        case 'safety-emergency-section':
          const safetyEntities = destination?.data?.entities?.filter((entity: any) => 
            entity.sectorId === 4 || normalize(entity.sectorName || '') === 'safety & emergency'
          );
          result = !!safetyEntities?.length;
          break;

        case 'shops-section':
          const shopEntities = destination?.data?.entities?.filter((entity: any) => 
            entity.sectorId === 6 || normalize(entity.sectorName || '') === 'shops'
          );
            result = !!shopEntities?.length;
          break;

        case 'accommodation-eatery-section':
          const accommodationEntities = destination?.data?.entities?.filter((entity: any) => 
            (entity.sectorId === 5 || normalize(entity.sectorName || '') === 'accommodation & eatery - accommodation') ||
            (entity.sectorId === 7 || normalize(entity.sectorName || '') === 'accommodation & eatery - eatery')
          );



          result = !!accommodationEntities?.length;
          break;

        case 'guide-map-section':
          result = true;
          break;

        default:
          result = false;
          break;
      }
      return result;
    });

    console.log('\n=== Final Filtered Menu Items ===');
    console.log(this.filteredMenuItems);
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
      const scrollPosition =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

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
          if (
            scrollPosition >= offsetTop - this.navbarHeight &&
            scrollPosition < offsetTop + offsetHeight - this.navbarHeight
          ) {
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
