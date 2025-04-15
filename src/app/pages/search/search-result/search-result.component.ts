import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SearchFilters, SearchService } from '../../../services/search.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeComponent } from 'angularx-qrcode';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';


export interface ResultItem {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  location: string;
  tags: string[];
}

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
  searchResults: ResultItem[] = this.searchService.getDestinations();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchService.filters$.subscribe({
      next: (filters) => {
        this.filters = filters;
        this.applyFilters(filters); // Apply filters once received
      },
      error: (err) => console.error('Error loading filters:', err),
      complete: () => console.log('Filters stream completed'),
    });
  }

  applyFilters(filters: SearchFilters): void {
    this.filteredResults = this.searchResults.filter((result: ResultItem) => {
      const matchesDistrict =
        !filters.district || result.location?.toLowerCase() === filters.district.toLowerCase();

      const matchesSearch =
        !filters.searchQuery ||
        result.title?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        result.description?.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesTags =
        !filters.tags || filters.tags.length === 0 ||
        filters.tags.some(tag =>
          result.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
        );

      const matchesExperience =
        !filters.experienceType ||
        result.tags?.map(t => t.toLowerCase()).includes(filters.experienceType.toLowerCase());

      const matchesSeasons =
        !filters.seasons || filters.seasons.length === 0 ||
        filters.seasons.some(season =>
          result.tags?.map(t => t.toLowerCase()).includes(season.toLowerCase())
        );

      const resultDurationHours = this.getHoursFromDuration(result.duration);
      const matchesDuration =
        (!filters.durations?.minHours || resultDurationHours >= filters.durations.minHours) &&
        (!filters.durations?.maxHours || resultDurationHours <= filters.durations.maxHours);

      return (
        matchesDistrict &&
        matchesSearch &&
        matchesTags &&
        matchesExperience &&
        matchesSeasons &&
        matchesDuration
      );
    });
  }

  getHoursFromDuration(duration: string): number {
    const daysMatch = duration.match(/(\d+)\s*day/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 0;
    return days * 24;
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
      alert('Link copied to clipboard!');
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
