import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
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
export class AccomodationEateryComponent implements AfterViewInit, OnDestroy {
  selectedHotel: any = null;
  selectedEatery: any = null;
  isHotelModalOpen = false;
  isEateryModalOpen = false;

  private destinationService = inject(DestinationService);
  destination = this.destinationService.getDestionation();
  imageService = inject(ImageService);

  constructor() {}
  
  ngAfterViewInit(): void {
    // Initialize carousels
    setTimeout(() => {   
      // Configure the carousels with responsive breakpoints
      initializeOwlCarousel('.hotels-carousel', true, true, 16, false, 
        [1, 2, 3], // Items to show at different breakpoints: mobile, tablet, desktop
        true);
        
      initializeOwlCarousel('.eateries-carousel', true, true, 16, false, 
        [1, 2, 3], // Items to show at different breakpoints: mobile, tablet, desktop
        true);
    }, 300);
  }
  
  openHotelModal(hotel: any) {
    this.selectedHotel = hotel;
    this.isHotelModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeHotelModal() {
    this.selectedHotel = null;
    this.isHotelModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  openEateryModal(eatery: any) {
    this.selectedEatery = eatery;
    this.isEateryModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeEateryModal() {
    this.selectedEatery = null;
    this.isEateryModalOpen = false;
    document.body.style.overflow = 'auto';
  }
  
  ngOnDestroy(): void {
    destroyOwlInstance('.hotels-carousel');
    destroyOwlInstance('.eateries-carousel');
  }
}
