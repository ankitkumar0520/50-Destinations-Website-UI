import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { initializeOwlCarousel, destroyOwlInstance } from '../../../utils/utils';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css',
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
export class ShopsComponent implements AfterViewInit, OnDestroy {
  
  private destinationService = inject(DestinationService);
  
  destination = this.destinationService.getDestionation();
  selectedShop: any = null;
  isModalOpen = false;

  constructor() {}
  
  ngAfterViewInit(): void {
    // Initialize carousel
    setTimeout(() => {   
      // Configure the carousel with responsive breakpoints
      initializeOwlCarousel('.shops-carousel', true, true, 16, false, 
        [1, 2, 3], // Items to show at different breakpoints: mobile, tablet, desktop
        true); 
    }, 300);
  }
  
  openModal(shop: any) {
    this.selectedShop = shop;
    this.isModalOpen = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedShop = null;
    this.isModalOpen = false;
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }
  
  ngOnDestroy(): void {
    destroyOwlInstance('.shops-carousel');
  }
}
