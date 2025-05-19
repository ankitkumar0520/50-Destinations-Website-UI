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
    trigger('imageAnimation', [
      state('loading', style({ opacity: 0 })),
      state('loaded', style({ opacity: 1 })),
      state('error', style({ opacity: 1 })),
      transition('loading => loaded', [animate('300ms ease-in')]),
      transition('loading => error', [animate('300ms ease-in')]),
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
  imageStates: { [key: string]: 'loading' | 'loaded' | 'error' } = {};
  modalImageState: 'loading' | 'loaded' | 'error' = 'loading';
  productImageStates: { [key: string]: 'loading' | 'loaded' | 'error' } = {};

  // Default images
  defaultShopImage = this.imageService.LANDSCAPE;
  defaultProductImage = this.imageService.SQUARE;

  constructor() {}

  ngOnInit(): void {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/\s+/g, ' ').trim();

    this.destinationService.destination$.subscribe((dest) => {
      if (dest?.entities) {
        this.shops = dest.entities.filter((entity: any) => {
          if (!entity) return false;

          const name = normalize(entity.sectorName || '').toLowerCase();
          return entity.sectorId === 4 || name === 'shops';
        });

        // Initialize image states for all shops
        this.shops?.forEach((shop: any) => {
          if (shop?.id) {
            this.imageStates[shop.id] = 'loading';
          }
        });
      }
    });
  }

  getShopImageUrl(shop: any): string {
    if (!shop?.media?.[0]?.mediaurl) {

      return this.defaultShopImage;
    }
    
    const mediaUrl = shop.media[0].mediaurl;

    
    if (mediaUrl.startsWith('http')) {
      return mediaUrl;
    }
    
    // Ensure proper URL construction
    const baseUrl = this.apiUploadUrl.endsWith('/') ? this.apiUploadUrl : this.apiUploadUrl + '/';
    const mediaPath = mediaUrl.startsWith('/') ? mediaUrl.substring(1) : mediaUrl;
    const fullUrl = baseUrl + mediaPath;
    

    return fullUrl;
  }

  getProductImageUrl(product: any): string {
    if (!product?.media?.[0]?.mediaurl) {

      return this.defaultProductImage;
    }
    
    const mediaUrl = product.media[0].mediaurl;

    
    if (mediaUrl.startsWith('http')) {
      return mediaUrl;
    }
    
    // Ensure proper URL construction
    const baseUrl = this.apiUploadUrl.endsWith('/') ? this.apiUploadUrl : this.apiUploadUrl + '/';
    const mediaPath = mediaUrl.startsWith('/') ? mediaUrl.substring(1) : mediaUrl;
    const fullUrl = baseUrl + mediaPath;
    
  
    return fullUrl;
  }

  onImageLoad(shopId: string) {

    this.imageStates[shopId] = 'loaded';
    this.cdr.detectChanges();
  }

  onModalImageLoad() {

    this.modalImageState = 'loaded';
    this.cdr.detectChanges();
  }

  onProductImageLoad(productId: string) {

    this.productImageStates[productId] = 'loaded';
    this.cdr.detectChanges();
  }

  onImageError(shopId: string, event: any) {
    console.error('Shop image error:', shopId, event);
    this.imageStates[shopId] = 'error';
    this.cdr.detectChanges();
  }

  onModalImageError(event: any) {
    console.error('Modal image error:', event);
    this.modalImageState = 'error';
    this.cdr.detectChanges();
  }

  onProductImageError(productId: string, event: any) {
    console.error('Product image error:', productId, event);
    this.productImageStates[productId] = 'error';
    this.cdr.detectChanges();
  }

  openModal(shop: any) {

    this.selectedShop = shop;
    this.isModalOpen = true;
    this.modalImageState = 'loading';
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

  trackByProductId(index: number, product: any): number {
    return product.id || index;
  }
}
