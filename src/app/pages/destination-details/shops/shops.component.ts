import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';

interface Product {
  name: string;
  image: string;
  price?: string;
  category?: string;
}

interface Shop {
  name: string;
  address: string;
  image: string;
  products: Product[];
  category: string;
}

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
export class ShopsComponent {
  
  private destinationService = inject(DestinationService);

  destination = this.destinationService.getDestionation();

  selectedShop: Shop | null = null;
  isModalOpen = false;

  openModal(shop: Shop) {
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
}
