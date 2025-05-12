import { Component, inject, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { initializeOwlCarousel, destroyOwlInstance } from '../../../utils/utils';
import { ImageService } from '../../../services/image.service';

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
export class ShopsComponent implements OnDestroy, OnInit {
  
  private destinationService = inject(DestinationService);
  private cdr = inject(ChangeDetectorRef);
   imageService = inject(ImageService);
  shops: any;
  selectedShop: any = null;
  isModalOpen = false;
  private carouselInitialized = false;

  constructor() {}
  
  ngOnInit(): void {
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();

    this.destinationService.destination$.subscribe(dest => {


      this.shops = dest.entities.filter((entity: any) => {
        if (!entity) return false; // Skip if entity is null or undefined
    
        // Normalize sectorName, check case insensitively
        const name = (normalize(entity.sectorName || '')).toLowerCase();
    
        // Check if sectorId is 4 or if sectorName matches 'Shops' case-insensitively
        return entity.sectorId === 4 || name === 'shops';
      });

      setTimeout(() => {
        this.initCarousel();
      }, 300);
    });

  }

  initCarousel(): void {
    if (!this.carouselInitialized) {
      setTimeout(() => {   
        initializeOwlCarousel('.shops-carousel', false, true, 16, false, 
          [1, 2, 3], // Items to show at different breakpoints: mobile, tablet, desktop
          true);
        
        this.carouselInitialized = true;
        this.cdr.detectChanges();
      }, 300);
    }
  }
  
  openModal(shop: any) {
    this.selectedShop = shop;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  closeModal() {
    this.selectedShop = null;
    this.isModalOpen = false;
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
