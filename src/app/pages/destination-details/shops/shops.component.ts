import { Component, inject, AfterViewInit, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
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
export class ShopsComponent implements AfterViewInit, OnDestroy, OnInit {
  
  private destinationService = inject(DestinationService);
  private cdr = inject(ChangeDetectorRef);
  
  destination :any;
  selectedShop: any = null;
  isModalOpen = false;
  private carouselInitialized = false;

    constructor() {}
  
  ngOnInit(): void {
    this.destinationService.destination$.subscribe(dest => {
      if (dest) {
        this.destination = dest;
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.carouselInitialized) {
      // Initialize carousel
      setTimeout(() => {   
        initializeOwlCarousel('.shops-carousel', true, true, 16, false, 
          [1, 2, 3], // Items to show at different breakpoints: mobile, tablet, desktop
          true);
        
        // Add event listener for cloned items
        const carousel = document.querySelector('.shops-carousel');
        if (carousel) {
          carousel.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const button = target.closest('button');
            if (button) {
              const item = button.closest('.item');
              if (item) {
                const index = Array.from(item.parentElement?.children || []).indexOf(item);
                if (index !== -1) {
                  this.openModal(this.destination.shops[index]);
                }
              }
            }
          });
        }
        
        this.carouselInitialized = true;
        this.cdr.detectChanges();
      }, 300);
    }
  }
  
  openModal(shop: any) {
    // Ensure we're working with the original shop data
    const originalShop = this.destination.shops.find((s: { id: number }) => s.id === shop.id) || shop;
    this.selectedShop = originalShop;
    this.isModalOpen = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  closeModal() {
    this.selectedShop = null;
    this.isModalOpen = false;
    // Restore body scroll
    document.body.style.overflow = 'auto';
    this.cdr.detectChanges();
  }
  
  trackByShopId(index: number, shop: any): number {
    return shop.id || index;
  }
  
  ngOnDestroy(): void {
    destroyOwlInstance('.shops-carousel');
  }
}
