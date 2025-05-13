import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';
import { initializeOwlCarousel, destroyOwlInstance } from '../../../utils/utils';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit, AfterViewInit, OnDestroy {
  private destinationService = inject(DestinationService);
  private platformId = inject(PLATFORM_ID);
  imageService = inject(ImageService);
  baseUrl = '';
 
  facilities:any[]=[];
  isMobile = false;

  constructor() {}

  ngOnInit() {
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();

    this.destinationService.destination$.subscribe(dest => {

      if(dest?.entities){
      this.facilities = dest.entities.filter((entity: any) => {
        if (!entity) return false; // Skip if entity is null or undefined
    
        // Normalize sectorName, check case insensitively
        const name = (normalize(entity.sectorName || '')).toLowerCase();
    
        // Check if sectorId is 2 or if sectorName matches 'facilities & services' case-insensitively
        return entity.sectorId === 2 || name === 'facilities & services';
      });
    }
    });
     

    if (isPlatformBrowser(this.platformId)) {
      // Initialize screen size detection
      this.checkScreenSize();
      window.addEventListener('resize', this.checkScreenSize.bind(this));
    }
  }

  ngAfterViewInit(): void {
    // Initialize Owl Carousel for mobile view
    if (isPlatformBrowser(this.platformId) && this.isMobile) {
      setTimeout(() => {
        // Configure owl carousel to show only 1 item per view
        initializeOwlCarousel('.facilities-carousel', true, true, 16, false, [1, 1, 1], true);
      }, 300);
    }
  }

  checkScreenSize(): void {

    if(isPlatformBrowser(this.platformId)){
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 1024; // lg breakpoint in Tailwind

    // If transitioning between mobile and desktop, need to reinitialize carousel or destroy it
    if (wasMobile !== this.isMobile) {
      if (this.isMobile) {
        setTimeout(() => {
          initializeOwlCarousel('.facilities-carousel', true, true, 16, false, [1, 1, 1], true);
        }, 300);
      } else {
        destroyOwlInstance('.facilities-carousel');
      }
      }
    }
  }

  ngOnDestroy(): void {  
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.checkScreenSize.bind(this));
      destroyOwlInstance('.facilities-carousel');
    }
  }
}
