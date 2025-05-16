import {
  Component,
  inject,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-accomodation-eatery',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './accomodation-eatery.component.html',
  styleUrl: './accomodation-eatery.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void <=> *', [animate('200ms ease-out')]),
    ]),
  ],
})
export class AccomodationEateryComponent implements OnInit {
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
  baseUrl = '';
  imageService = inject(ImageService);
  private cdr = inject(ChangeDetectorRef);
  destinationInfo: any;
  constructor() {}

  sectionHeaderData = {
    badgeText: 'Stay & Dine',
    titleLeft: 'Accommodation &',
    titleMiddleHighlighted: 'Eateries',
    description:
      "Discover the best places to stay and dine. Experience the perfect blend of comfort and culinary delight. From cozy guest houses to authentic local eateries, we've curated the top options for your stay and dining experience.",
    features: [
      { icon: 'fas fa-hotel', text: 'Quality Stays' },
      { icon: 'fas fa-utensils', text: 'Local Cuisines' },
      { icon: 'fas fa-map-marker-alt', text: 'Convenient Locations' },
    ],
  };

  ngOnInit(): void {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/\s+/g, ' ').trim();

    this.destinationService.destination$.subscribe({
      next: (dest) => {
        if (!dest || !dest.entities) {
          console.warn('No destination data available');
          return;
        }

        this.accomodation = dest.entities.filter((entity: any) => {
          if (!entity) return false;
          const name = normalize(entity.sectorName || '').toLowerCase();
          const isMatch =
            entity.sectorId === 5 ||
            name === 'accommodation & eatery - accommodation';

          return isMatch;
        });

        // Filter eatery
        this.eatery = dest.entities.filter((entity: any) => {
          if (!entity) return false;
          const name = normalize(entity.sectorName || '').toLowerCase();
          const isMatch =
            entity.sectorId === 7 || name === 'accommodation & eatery - eatery';

          return isMatch;
        });

        // Force change detection
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error in destination subscription:', error);
      },
    });
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
              const index = Array.from(item.parentElement!.children).indexOf(
                item
              );
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
              const index = Array.from(item.parentElement!.children).indexOf(
                item
              );
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
    const originalHotel =
      this.accomodation.find((h: { id: number }) => h.id === hotel.id) || hotel;
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
    const originalEatery =
      this.eatery.find((e: { id: number }) => e.id === eatery.id) || eatery;
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
}
