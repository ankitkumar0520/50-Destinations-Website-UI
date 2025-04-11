import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchService, SearchFilters } from '../../../services/search.service';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  duration: string;
  tags: string[];
  type: 'Trekking' | 'Lake' | 'Monastery' | 'Viewpoint' | 'Cultural' | 'Wildlife';
  experienceType: 'Adventure' | 'Nature' | 'Spiritual' | 'Photography' | 'Cultural' | 'Relaxation';
}

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchResultComponent implements OnInit {
  searchResults: SearchResult[] = [
    {
      id: 1,
      title: 'Kanchenjunga Base Camp Trek',
      description: 'Challenging trek to the world\'s third highest mountain with breathtaking Himalayan views.',
      image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      location: 'Gangtok',
      duration: '7 days',
      tags: ['High Altitude', 'Camping', 'Challenging'],
      type: 'Trekking',
      experienceType: 'Adventure'
    },
    {
      id: 2,
      title: 'Tsomgo Lake Day Trip',
      description: 'Serene high-altitude lake with yak rides and stunning mountain reflections.',
      image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      location: 'Gangtok',
      duration: '1 day',
      tags: ['Yak Ride', 'Winter Wonderland', 'Easy Access'],
      type: 'Lake',
      experienceType: 'Nature'
    },
    {
      id: 3,
      title: 'Rumtek Monastery Experience',
      description: 'Explore one of Sikkim\'s most important Buddhist monasteries with golden stupas.',
      image: 'https://images.unsplash.com/photo-1513415277900-a62401e19be4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      location: 'Gangtok',
      duration: 'Half day',
      tags: ['Buddhism', 'Meditation', 'Architecture'],
      type: 'Monastery',
      experienceType: 'Spiritual'
    },
    {
      id: 4,
      title: 'Tashi Viewpoint Sunrise',
      description: 'Panoramic sunrise views over Kanchenjunga range with coffee service.',
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b8b7393?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.6,
      location: 'Gangtok',
      duration: '2 hours',
      tags: ['Sunrise', 'Easy Access', 'Photography'],
      type: 'Viewpoint',
      experienceType: 'Photography'
    },
    {
      id: 5,
      title: 'Gangtok Cultural Walk',
      description: 'Guided tour through local markets, temples and colonial landmarks.',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.5,
      location: 'Gangtok',
      duration: '1 day',
      tags: ['Local Food', 'Handicrafts', 'History'],
      type: 'Cultural',
      experienceType: 'Cultural'
    },
    {
      id: 6,
      title: 'Varsey Rhododendron Sanctuary',
      description: 'Springtime walk through vibrant rhododendron forests with birdwatching.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      rating: 4.4,
      location: 'Soreng',
      duration: '1 day',
      tags: ['Flowers', 'Nature Trail', 'Birding'],
      type: 'Wildlife',
      experienceType: 'Relaxation'
    }
  ];

  filteredResults: SearchResult[] = [];
  currentPage = 1;
  itemsPerPage = 8;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.filteredResults = [...this.searchResults];
    this.searchService.filters$.subscribe(filters => {
      console.log('Received filters:', filters); // Debug log
      this.applyFilters(filters);
    });
  }

  private applyFilters(filters: SearchFilters) {
    let results = [...this.searchResults];
    console.log('Initial results:', results); // Debug log

    // Apply district filter
    if (filters.district) {
      console.log('Filtering by district:', filters.district); // Debug log
      results = results.filter(result => 
        result.location.toLowerCase().includes(filters.district.toLowerCase())
      );
      console.log('Results after district filter:', results); // Debug log
    }

    // Apply experience filter
    if (filters.experience) {
      console.log('Filtering by experience:', filters.experience); // Debug log
      results = results.filter(result => 
        result.experienceType.toLowerCase().includes(filters.experience.toLowerCase())
      );
      console.log('Results after experience filter:', results); // Debug log
    }

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      console.log('Filtering by search query:', query); // Debug log
      results = results.filter(result => 
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query) ||
        result.tags.some(tag => tag.toLowerCase().includes(query))
      );
      console.log('Results after search query filter:', results); // Debug log
    }

    // Apply tags filter
    if (filters.tags.size > 0) {
      console.log('Filtering by tags:', Array.from(filters.tags)); // Debug log
      results = results.filter(result => {
        // Check if any selected tag matches the destination's type or tags
        return Array.from(filters.tags).some(selectedTag => {
          // Convert both to lowercase for case-insensitive comparison
          const tag = selectedTag.toLowerCase();
          const type = result.type.toLowerCase();
          
          // Check if the tag matches the destination type
          if (tag === 'monasteries' && type === 'monastery') return true;
          if (tag === 'lakes' && type === 'lake') return true;
          if (tag === 'viewpoints' && type === 'viewpoint') return true;
          if (tag === 'trekking' && type === 'trekking') return true;
          if (tag === 'wildlife' && type === 'wildlife') return true;
          if (tag === 'waterfalls' && type === 'waterfall') return true;
          if (tag === 'hotsprings' && type === 'hotspring') return true;
          if (tag === 'temples' && type === 'temple') return true;
          
          // Check if any of the destination's tags match the selected tag
          return result.tags.some(destinationTag => 
            destinationTag.toLowerCase().includes(tag)
          );
        });
      });
      console.log('Results after tag filter:', results); // Debug log
    }

    // Apply duration filter
    if (filters.durations.size > 0) {
      results = results.filter(result => {
        const duration = result.duration.toLowerCase();
        return Array.from(filters.durations).some(selectedDuration => {
          if (selectedDuration === '0-3') return duration.includes('hour') || duration.includes('half day');
          if (selectedDuration === '3-6') return duration.includes('hours') || duration.includes('half day');
          if (selectedDuration === '1-day') return duration.includes('day') && !duration.includes('days');
          if (selectedDuration === '2-3-days') return duration.includes('days') && !duration.includes('4+');
          if (selectedDuration === '4-plus') return duration.includes('days') || duration.includes('week');
          return false;
        });
      });
    }

    // Apply sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'popularity':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          results.sort((a, b) => b.id - a.id);
          break;
      }
    }

    console.log('Filtered results:', results); // Debug log
    this.filteredResults = results;
    this.currentPage = 1; // Reset to first page when filters change
  }

  get totalItems(): number {
    return this.filteredResults.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedResults(): SearchResult[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredResults.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  navigateToDetail(result: SearchResult): void {
    this.router.navigate(['/destinations', result.id]);
  }

  formatPrice(price: number): string {
    return `₹${price.toLocaleString('en-IN')}`;
  }
}
