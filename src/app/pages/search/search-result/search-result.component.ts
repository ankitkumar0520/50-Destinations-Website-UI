import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import {
  SearchFilters,
  SearchService,
} from '../../../services/search.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeComponent } from 'angularx-qrcode';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { SafeUrl } from '@angular/platform-browser';
import { downloadQRCode, shareQRCode } from '../../../utils/utils';
import { DestinationService } from '../../../services/destination.service';

interface Tag {
  label: string;
}

interface SearchResult {
  tags: Tag[];
  slug: string;
  destinationname: string;
  galleryImages: Array<{itemImageSrc: string}>;
  duration: string;
  districtname: string;
  shortdescription: string;
  name: string;
}

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, QRCodeComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit, OnDestroy {
  imageService = inject(ImageService);

  @ViewChildren('qrCanvas') qrCanvases!: QueryList<ElementRef>;

  districtParam: string | null = null;
  private platformId = inject(PLATFORM_ID);
  siteUrl: string = isPlatformBrowser(this.platformId)
    ? window.location.origin
    : '';

  filters: SearchFilters | null = null;
  filteredResults: SearchResult[] = [];
  currentPage = 1;
  itemsPerPage = 8;

  isQRVisibleMap: { [key: number]: boolean } = {};

  private searchService = inject(SearchService);
  destinationService = inject(DestinationService);
  searchResults = this.destinationService.getAllDestinations();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchService.filters$.subscribe({
      next: (filters) => {
        this.filters = filters;
        this.filteredResults = this.searchService.applyFilters(
          filters,
          this.searchResults
        );
      },
      error: (err) => console.error('Error loading filters:', err),
      complete: () => console.log('Filters stream completed'),
    });
  }

  navigateToDetail(slug: string): void {
    this.router.navigate(['/destination', slug]);
  }

  switchQR(i: number): void {
    this.isQRVisibleMap[i] = !this.isQRVisibleMap[i];
  }

  shareQR(index: number): void {
    const result = this.filteredResults[index];
    const url = this.siteUrl + '/destination/' + result.slug;
    shareQRCode(
      url,
      `Explore ${result.name}`,
      `Check out ${result.name} in Sikkim!`
    );
  }

  downloadQR(index: number): void {
    const result = this.filteredResults[index];
    const qrCanvas = document.querySelector(`#qr-${index} canvas`) as HTMLCanvasElement;
    
    if (!qrCanvas) {
      console.error('QR canvas not found for index:', index);
      return;
    }

    try {
      const link = document.createElement('a');
      link.download = `${result.name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
      link.href = qrCanvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  }

  flipAll(): void {
    const anyVisible = Object.values(this.isQRVisibleMap).some((val) => val);
    const shouldShow = !anyVisible;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      this.filteredResults.length
    );

    for (let i = startIndex; i < endIndex; i++) {
      this.isQRVisibleMap[i] = shouldShow;
    }
  }

  areAllVisible(): boolean {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      this.filteredResults.length
    );

    for (let i = startIndex; i < endIndex; i++) {
      if (!this.isQRVisibleMap[i]) {
        return false;
      }
    }
    return true;
  }

  ngOnDestroy(): void {
    this.searchService.resetFilters();
  }
}
