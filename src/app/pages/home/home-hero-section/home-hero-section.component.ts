import { Component, inject, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeMinisterProfileComponent } from '../home-minister-profile/home-minister-profile.component';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeMinisterProfileComponent],
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.css',
})
export class HomeHeroSectionComponent implements OnInit {
  searchQuery: string = '';
  filteredDestinations: any[] = [];
  showDropdown = false;
  private searchService = inject(SearchService);
  private router = inject(Router);
  private apiService = inject(ApiService);

  snowflakes: Array<{ style: string }> = [];

  heroData = {
    title: 'An Adventurer’s Paradise',
    subtitle: 'Eco-friendly tourism that preserves the pristine beauty and cultural heritage of Sikkim, one adventure at a time.',
  };
  

  private searchTimeout: any;

  ngOnInit() {
    this.generateSnowflakes();
  }

  private generateSnowflakes() {
    const flakes = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 5 + 3; // Random size between 3px and 8px
      const left = Math.random() * 100; // Random horizontal position
      const animationDuration = Math.random() * 10 + 5; // Random duration between 5s and 15s
      const delay = Math.random() * 5; // Random delay between 0s and 5s
      
      flakes.push({
        style: `
          width: ${size}px;
          height: ${size}px;
          left: ${left}%;
          animation-duration: ${animationDuration}s;
          animation-delay: ${delay}s;
        `
      });
    }
    this.snowflakes = flakes;
  }

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

  redirectToSearch() {
    this.router.navigate(['/destinations']);
  }
}
