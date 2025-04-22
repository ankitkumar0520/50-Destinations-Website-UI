import { Component, inject, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeMinisterProfileComponent } from '../home-minister-profile/home-minister-profile.component';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';
import { SORT_OPTIONS } from '../../../../enums/search-filters.enum';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeMinisterProfileComponent],
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.css',
})
export class HomeHeroSectionComponent {
  searchQuery: string = '';
  destinations = [
    {
      name: 'Rumtek Monastery',
      image: 'assets/Images/rumtek-monastry/image1.jpg',
    },
    {
      name: 'Tsomgo Lake',
      image: 'assets/Images/destinations/tsomgo-lake.jpg',
    },
    {
      name: 'Nathula Pass',
      image: 'assets/Images/destinations/nathula-pass.jpg',
    },
    { name: 'MG Marg', image: 'assets/Images/destinations/mg-marg.jpg' },
    {
      name: 'Buddha Park',
      image: 'assets/Images/destinations/buddha-park.jpg',
    },
    {
      name: 'Yumthang Valley',
      image: 'assets/Images/destinations/yumthang-valley.jpg',
    },
    { name: 'Gangtok', image: 'assets/Images/districts/gangtok.jpg' },
    { name: 'Namchi', image: 'assets/Images/districts/namchi.jpg' },
    { name: 'Pelling', image: 'assets/Images/districts/pelling.jpg' },
    { name: 'Mangan', image: 'assets/Images/districts/mangan.jpg' },
  ];
  filteredDestinations = this.destinations;
  showDropdown = false;
  private searchService = inject(SearchService);
  private router = inject(Router);

  heroData = {
    title: 'Discover Your Next Adventure',
    subtitle: 'Explore 50 breathtaking destinations around the world',
    image: 'assets/Images/Placeholder/bg-new.jpg',
  };

  onSearchQueryChange() {
    this.filteredDestinations = this.destinations.filter((destination) =>
      destination.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.showDropdown = this.filteredDestinations.length > 0;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const isInsideDropdown = target.closest('.dropdown');
    const isInputField = target.closest('input');

    if (!isInsideDropdown && !isInputField) {
      this.hideDropdown();
    }
  }

  onDestinationClick(destinationId: number) {
    this.router.navigate([`/destination/${destinationId}`]);
  }

  onInputClick() {
    if (this.searchQuery) {
      this.showDropdown = true;
    }
  }
}
