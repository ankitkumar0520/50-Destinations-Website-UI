import { Component, inject, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';
import { initializeOwlCarousel, destroyOwlInstance } from '../../../utils/utils';

@Component({
  selector: 'app-accomodation-eatery',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './accomodation-eatery.component.html',
  styleUrl: './accomodation-eatery.component.css',
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void <=> *', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class AccomodationEateryComponent implements OnDestroy, OnInit {
  selectedHotel: any = null;
  selectedEatery: any = null;
  isHotelModalOpen = false;
  isEateryModalOpen = false;

  @ViewChild('hotelsCarousel') hotelsCarousel!: ElementRef;
  @ViewChild('eateriesCarousel') eateriesCarousel!: ElementRef;
  private hotelCarouselInstance: any;
  private eateryCarouselInstance: any;
  private carouselsInitialized = false;

  private destinationService = inject(DestinationService);
  accomodation: any[] = [];
  eatery: any[] = [];
  
  imageService = inject(ImageService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}
  
  ngOnInit(): void {
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();

    console.log('Starting subscription to destination$');
    
    this.destinationService.destination$.subscribe({
      next: (dest) => {
        console.log('Received destination data:', dest);
        
        if (!dest || !dest.entities) {
          console.warn('No destination data available');
          return;
        }

        console.log('Total entities:', dest.entities.length);

        // Filter accommodation
      this.accomodation = dest.entities.filter((entity: any) => {
          if (!entity) return false;
        const name = (normalize(entity.sectorName || '')).toLowerCase();
          const isMatch = entity.sectorId === 5 || name === 'accommodation & eatery';
          console.log('Checking entity:', entity.sectorName, 'isMatch:', isMatch);
          return isMatch;
        });

        console.log('Filtered accommodation:', this.accomodation);

        // Filter eatery
      this.eatery = dest.entities.filter((entity: any) => {
          if (!entity) return false;
        const name = (normalize(entity.sectorName || '')).toLowerCase();
          const isMatch = entity.sectorId === 7 || name === 'eatery';
          console.log('Checking entity:', entity.sectorName, 'isMatch:', isMatch);
          return isMatch;
        });

        console.log('Filtered eatery:', this.eatery);

        // Force change detection
        this.cdr.detectChanges();

        // Initialize carousel after data is loaded and DOM is updated
        if (this.accomodation.length > 0 || this.eatery.length > 0) {
          console.log('Initializing carousel with data');
          // Use setTimeout to ensure DOM is updated
       setTimeout(() => {
        this.initCarousel();
          }, 0);
        } else {
          console.log('No data to initialize carousel');
        }
      },
      error: (error) => {
        console.error('Error in destination subscription:', error);
      }
    });
  }
  
  initCarousel(): void {
    if (this.carouselsInitialized) {
      console.log('Carousels already initialized');
      return;
    }

    try {
      // Destroy any existing instances first
      if (this.hotelCarouselInstance) {
        destroyOwlInstance('.hotels-carousel');
      }
      if (this.eateryCarouselInstance) {
        destroyOwlInstance('.eateries-carousel');
      }

      console.log('Initializing hotel carousel');
      if (this.accomodation.length > 0) {
        this.hotelCarouselInstance = initializeOwlCarousel(
          '.hotels-carousel',
          false,
          true,
          16,
          false,
          [1, 2, 3],
          true
        );
      }

      console.log('Initializing eatery carousel');
      if (this.eatery.length > 0) {
        this.eateryCarouselInstance = initializeOwlCarousel(
          '.eateries-carousel',
          false,
          true,
          16,
          false,
          [1, 2, 3],
          true
        );
      }

        this.setupCarouselEventListeners();
        this.carouselsInitialized = true;
      console.log('Carousels initialized successfully');
    } catch (error) {
      console.error('Error initializing carousels:', error);
      }
  }

  private setupCarouselEventListeners() {
    try {
    // Hotel carousel event listener
      const hotelCarouselElement = this.hotelsCarousel?.nativeElement;
      if (hotelCarouselElement) {
    hotelCarouselElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button');
      
      if (button) {
        const item = button.closest('.item');
        if (item) {
          const index = Array.from(item.parentElement!.children).indexOf(item);
          const originalIndex = index % this.accomodation.length;
          const originalHotel = this.accomodation[originalIndex];
          this.openHotelModal(originalHotel);
        }
      }
    });
      }

    // Eatery carousel event listener
      const eateryCarouselElement = this.eateriesCarousel?.nativeElement;
      if (eateryCarouselElement) {
    eateryCarouselElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button');
      
      if (button) {
        const item = button.closest('.item');
        if (item) {
          const index = Array.from(item.parentElement!.children).indexOf(item);
          const originalIndex = index % this.eatery.length;
          const originalEatery = this.eatery[originalIndex];
          this.openEateryModal(originalEatery);
        }
      }
    });
      }
    } catch (error) {
      console.error('Error setting up carousel event listeners:', error);
    }
  }
  
  openHotelModal(hotel: any) {
    const originalHotel = this.accomodation.find((h: { id: number }) => h.id === hotel.id) || hotel;
    this.selectedHotel = originalHotel;
    this.isHotelModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  closeHotelModal() {
    this.selectedHotel = null;
    this.isHotelModalOpen = false;
    document.body.style.overflow = 'auto';
    this.cdr.detectChanges();
  }

  openEateryModal(eatery: any) {
    const originalEatery = this.eatery.find((e: { id: number }) => e.id === eatery.id) || eatery;
    this.selectedEatery = originalEatery;
    this.isEateryModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  closeEateryModal() {
    this.selectedEatery = null;
    this.isEateryModalOpen = false;
    document.body.style.overflow = 'auto';
    this.cdr.detectChanges();
  }

  trackByHotelId(index: number, hotel: any): number {
    return hotel.id || index;
  }

  trackByEateryId(index: number, eatery: any): number {
    return eatery.id || index;
  }
  
  ngOnDestroy(): void {
    if (this.hotelCarouselInstance) {
      destroyOwlInstance('.hotels-carousel');
    }
    if (this.eateryCarouselInstance) {
      destroyOwlInstance('.eateries-carousel');
    }
  }
}
