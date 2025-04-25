import { Component, inject, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeMinisterProfileComponent } from '../home-minister-profile/home-minister-profile.component';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';
import { SORT_OPTIONS } from '../../../../enums/search-filters.enum';
import { ImageService } from '../../../services/image.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeMinisterProfileComponent],
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.css',
})
export class HomeHeroSectionComponent {
  searchQuery: string = '';
  filteredDestinations: any[] = [];
  showDropdown = false;
  private searchService = inject(SearchService);
  private router = inject(Router);
  private apiService = inject(ApiService);

  heroData = {
    title: 'Discover Your Next Adventure',
    subtitle: 'Explore 50 breathtaking destinations around the Sikkim',
    image: 'assets/Images/Placeholder/bg-new.jpg',
  };

  private searchTimeout: any;

  onSearchQueryChange() {
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Set new timeout to debounce API calls
    this.searchTimeout = setTimeout(() => {
      if (this.searchQuery.trim()) {
        const encodedKeyword = encodeURIComponent(this.searchQuery);
        this.apiService
          .get(
            `LandingPage/GetAllDestinationsWithBasicDetailsByNameKeyword?keyword=${encodedKeyword}`
          )
          .subscribe({
            next: (response: any) => {
              this.filteredDestinations = response.map((dest: any) => ({
                name: dest.destinationname,
                image:
                  dest.media?.find((m: any) => m.iscover)?.mediaurl ||
                  'assets/placeholders/landscape.webp',
                id: dest.destinationid,
              }));
              this.showDropdown = this.filteredDestinations.length > 0;
            },
            error: (error) => {
              console.error('Error fetching destinations:', error);
              this.filteredDestinations = [];
              this.showDropdown = false;
            },
          });
      } else {
        this.filteredDestinations = [];
        this.showDropdown = false;
      }
    }, 300); // 300ms debounce time
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const isInsideDropdown = target.closest('.dropdown');
    const isInputField = target.closest('input');

    if (!isInsideDropdown && !isInputField) {
      this.hideDropdown();
    }
  }

  onDestinationClick(destinationId: string) {
    this.router.navigate([`/destination/${destinationId}`]);
  }

  onInputClick() {
    if (this.searchQuery) {
      this.showDropdown = true;
    }
  }

  hideDropdown() {
    this.showDropdown = false;
  }

  searchDestinations() {
    this.searchService.updateFilters({
      searchQuery: this.searchQuery,
    });
    this.redirectToSearch();
  }

  searchPopular() {
    this.searchService.updateFilters({
      sort: SORT_OPTIONS[0].id,
    });
    this.redirectToSearch();
  }

  redirectToSearch() {
    this.router.navigate(['/destinations']);
  }
}
