import {
  Component,
  inject,
  OnDestroy,
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
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void <=> *', [animate('200ms ease-out')]),
    ]),
  ],
})
export class ShopsComponent implements OnInit {
  apiUploadUrl = environment.apiUploadUrl;
  private destinationService = inject(DestinationService);
  private cdr = inject(ChangeDetectorRef);
  imageService = inject(ImageService);
  shops: any;
  selectedShop: any = null;
  isModalOpen = false;
  private carouselInitialized = false;

  // Image loading states
  imageLoaded = false;
  modalImageLoaded = false;
  productImageLoaded = false;

  constructor() {}

  ngOnInit(): void {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/\s+/g, ' ').trim();

    this.destinationService.destination$.subscribe((dest) => {
      if (dest?.entities) {
        this.shops = dest.entities.filter((entity: any) => {
          if (!entity) return false; // Skip if entity is null or undefined

          // Normalize sectorName, check case insensitively
          const name = normalize(entity.sectorName || '').toLowerCase();

          // Check if sectorId is 4 or if sectorName matches 'Shops' case-insensitively
          return entity.sectorId === 4 || name === 'shops';
        });
      }
    });
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
}
