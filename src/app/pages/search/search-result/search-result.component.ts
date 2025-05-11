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
  DEFAULT_FILTERS,
  SearchService,
} from '../../../services/search.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeComponent } from 'angularx-qrcode';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { shareQRCode } from '../../../utils/utils';
import { DestinationService } from '../../../services/destination.service';
import { ApiService } from '../../../services/api.service'; 
import { finalize } from 'rxjs';

interface Tag {
  tagname: string;
}

interface SearchResult {
  destinationname: string;
  districtname: string;
  destinationdescription: string;
  slug: string;
  duration: number;
  media: { mediaurl: string }[];
  tags: Tag[];
}

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, QRCodeComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit, OnDestroy {

  private searchService = inject(SearchService);
  private destinationService = inject(DestinationService);
  private router = inject(Router);
  imageService = inject(ImageService);
  private apiService = inject(ApiService);

  @ViewChildren('qrCanvas') qrCanvases!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);
  siteUrl: string = isPlatformBrowser(this.platformId)
    ? window.location.origin
    : '';

  payload: any; 
  filteredResults: SearchResult[] = [];
  isQRVisibleMap: { [key: number]: boolean } = {};
  currentPage = DEFAULT_FILTERS.pageNumber;
  itemsPerPage = DEFAULT_FILTERS.pageSize;
  totalItems = 0;
  isLoading = false;
  imageLoaded = false;

  searchResults: any;
  ngOnInit(): void {
    this.searchService.payload$.subscribe({
      next: (payload) => {
        this.payload = payload;
        console.log('payload',this.payload);
        this.getSearchResults();
        this.currentPage = payload.pageNumber;
        this.itemsPerPage = payload.pageSize;
      },
      error: (error) => {
        console.error('Error fetching search payload:', error.error.message);
      }
    }); 

  }

  getSearchResults() {
    this.isLoading = true;
  
    this.apiService.post('LandingPage/GetAllDestinationsBasicDetailsWithSearchParams', this.payload)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          this.searchResults = response;
          this.filteredResults = this.searchResults.data;
          this.totalItems = this.searchResults.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching search results:', error);
        }
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
      `Explore ${result.destinationname}`,
      `Check out ${result.destinationname} in Sikkim!`
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
      link.download = `${result.destinationname.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
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


  changePage(page: number) {
    this.searchService.updateFilters({ pageNumber: page });
    this.currentPage = page;
  }

  ngOnDestroy(): void {
    this.searchService.resetFilters();
  }


}