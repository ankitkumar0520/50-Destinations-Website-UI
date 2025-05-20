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
import { takeUntil, filter, take } from 'rxjs/operators';
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

        // Start listening *before* calling API
      this.destinationService.destination$.pipe(
        filter(destination => !!destination?.data),
        take(1) // complete after the first non-null valid data
      ).subscribe(destination => {
        this.updateMenuItems(destination.data);
      });

    // Now trigger the API call
    this.destinationService.getDestinationbySlug(this.route.snapshot.params['slug']);

  }

  
  private updateMenuItems(destination: any) {
    console.log('=== Starting Menu Items Update ===');
    console.log('Destination Data:', destination?.data);
  
    const normalize = (str: string): string =>
      str.toLowerCase().replace(/\s+/g, ' ').trim();
  
    // Create quick lookup maps for entities
    const entities = destination?.data?.entities || [];
    const sectorIdMap = new Map<number, any[]>();
    const sectorNameMap = new Map<string, any[]>();
  
    for (const entity of entities) {
      const sectorId = entity.sectorId;
      const sectorName = normalize(entity.sectorName || '');
  
      if (sectorId != null) {
        if (!sectorIdMap.has(sectorId)) sectorIdMap.set(sectorId, []);
        sectorIdMap.get(sectorId)?.push(entity);
      }
  
      if (sectorName) {
        if (!sectorNameMap.has(sectorName)) sectorNameMap.set(sectorName, []);
        sectorNameMap.get(sectorName)?.push(entity);
      }
    }
  
    // Reusable function to check if any entities exist with given IDs or names
    const hasEntities = (sectorIds: number[], sectorNames: string[]): boolean => {
      for (const id of sectorIds) {
        if (sectorIdMap.has(id)) return true;
      }
      for (const name of sectorNames.map(normalize)) {
        if (sectorNameMap.has(name)) return true;
      }
      return false;
    };
  
    // Filter menu items based on data availability
    this.filteredMenuItems = this.menuItems.filter(item => {
      switch (item.id) {
        case 'about-section':
          return true;
  
        case 'galleries-section':
          return destination?.data?.media?.length > 0;
  
        case 'points-of-interest-section':
          return hasEntities([3], ['point of interest']);
  
        case 'facilities-services-section':
          return hasEntities([2], ['facilities & services']);
  
        case 'safety-emergency-section':
          return hasEntities([4], ['safety & emergency']);
  
        case 'shops-section':
          return hasEntities([6], ['shops']);
  
        case 'accommodation-eatery-section':
          return hasEntities(
            [5, 7],
            ['accommodation & eatery - accommodation', 'accommodation & eatery - eatery']
          );
  
        case 'guide-map-section':
          return true;
  
        default:
          return false;
      }
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
