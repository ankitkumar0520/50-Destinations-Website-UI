import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ResultItem, SearchFilters, SearchService } from '../../../services/search.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeComponent } from 'angularx-qrcode';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';


@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,
    QRCodeComponent
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit {
  @ViewChildren('qrCanvas') qrCanvases!: QueryList<ElementRef>;


  private platformId = inject(PLATFORM_ID);
  siteUrl: string = isPlatformBrowser(this.platformId)
    ? window.location.origin
    : '';
    
  filters: SearchFilters | null = null;
  filteredResults: ResultItem[] = [];
  paginatedResults: ResultItem[] = [];
  currentPage = 1;
  itemsPerPage = 12;

  isQRVisibleMap: { [key: number]: boolean } = {};

  private searchService = inject(SearchService);
  searchResults = this.searchService.getDestinations();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchService.filters$.subscribe({
      next: (filters) => {
        this.filters = filters;
        this.filteredResults = this.searchService.applyFilters(filters,this.searchResults); // Apply filters once received
      },
      error: (err) => console.error('Error loading filters:', err),
      complete: () => console.log('Filters stream completed'),
    });
  }




  navigateToDetail(id: number): void {
    // redirect to main destination page (implement routing as needed)
    this.router.navigate(['/destination', id]);
  }

  switchQR(i: number): void {
    this.isQRVisibleMap[i] = !this.isQRVisibleMap[i];
  }

  shareQR(index: number): void {
    const result = this.filteredResults[index];
    const url = this.siteUrl + '/' + result.id;

    if (navigator.share) {
      navigator.share({
        title: `Explore ${result.title}`,
        text: `Check out ${result.title} in Sikkim!`,
        url: url,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      const tempInput = document.createElement('input');
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }
  }

downloadQR(index: number): void {
  const canvas = this.qrCanvases.toArray()[index]?.nativeElement?.querySelector('canvas');
  if (canvas) {
    const link = document.createElement('a');
    link.download = `${this.filteredResults[index].title}-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}

  //for card to flip all
  flipAll(): void {
    // Check if any card is currently showing QR
    const anyVisible = Object.values(this.isQRVisibleMap).some(val => val);
    
    // If any card is showing QR, hide all. Otherwise show all
    const shouldShow = !anyVisible;
    
    // Update all cards in the current page
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredResults.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      this.isQRVisibleMap[i] = shouldShow;
    }
  }
  
  areAllVisible(): boolean {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredResults.length);
    
    // Check if all cards in current page are showing QR
    for (let i = startIndex; i < endIndex; i++) {
      if (!this.isQRVisibleMap[i]) {
        return false;
      }
    }
    return true;
  }
  

  
}
