import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  duration: string;
  tags: string[];
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
      title: 'Lachung Valley Trek',
      description: 'Experience the breathtaking beauty of Lachung Valley with this guided trek through pristine landscapes and traditional villages.',
      image: 'assets/Images/orange-stroke.png',
      rating: 4.8,
      location: 'Mangan',
      duration: '3 days',
      tags: ['Trekking', 'Valley', 'Nature']
    },
    {
      id: 2,
      title: 'Tsomgo Lake Adventure',
      description: 'Discover the stunning Tsomgo Lake with this adventure package that includes yak rides and local cultural experiences.',
      image: 'assets/Images/orange-stroke.png',
      rating: 4.6,
      location: 'Gangtok',
      duration: '2 days',
      tags: ['Lake', 'Adventure', 'Culture']
    },
    {
      id: 3,
      title: 'Pelling Monastery Tour',
      description: 'Explore the ancient monasteries of Pelling with this comprehensive tour that includes meditation sessions and traditional meals.',
      image: 'assets/Images/orange-stroke.png',
      rating: 4.9,
      location: 'Gyalshing',
      duration: '1 day',
      tags: ['Monastery', 'Spiritual', 'Culture']
    },
    {
      id: 4,
      title: 'Temi Tea Garden Experience',
      description: 'Immerse yourself in the serene beauty of Temi Tea Garden with this unique experience that includes tea tasting and garden tours.',
      image: 'assets/Images/orange-stroke.png',
      rating: 4.7,
      location: 'Namchi',
      duration: '1 day',
      tags: ['Tea Garden', 'Nature', 'Agriculture']
    },
    {
      id: 5,
      title: 'Yumthang Valley Flower Tour',
      description: 'Discover the vibrant flowers of Yumthang Valley with this guided tour that includes hot spring visits and local cuisine.',
      image: 'assets/Images/orange-stroke.png',
      rating: 4.5,
      location: 'Mangan',
      duration: '2 days',
      tags: ['Valley', 'Flowers', 'Hot Springs']
    },
    {
      id: 6,
      title: 'Gangtok City Explorer',
      description: 'Explore the vibrant city of Gangtok with this comprehensive tour that includes visits to key landmarks and local markets.',
      image: 'assets/Images/orange-stroke.png',
      rating: 4.8,
      location: 'Gangtok',
      duration: '1 day',
      tags: ['City', 'Culture', 'Shopping']
    },
    {
      id: 7,
      title: 'Rumtek Monastery Experience',
      description: 'Visit the magnificent Rumtek Monastery, a replica of the original Tsurphu Monastery in Tibet, with its stunning architecture and spiritual atmosphere.',
      image: 'assets/Images/orange-stroke.png',
      rating: 4.7,
      location: 'Gangtok',
      duration: '1 day',
      tags: ['Monastery', 'Spiritual', 'Architecture']
    },
    {
      id: 8,
      title: 'Nathula Pass Adventure',
      description: 'Experience the historic Nathula Pass, a high-altitude mountain pass connecting India to Tibet, with breathtaking views of the snow-capped Himalayas.',
      image: 'assets/Images/orange-stroke.png',
      rating: 4.9,
      location: 'Gangtok',
      duration: '1 day',
      tags: ['Mountain Pass', 'History', 'Adventure']
    }
  ];

  currentPage = 1;
  itemsPerPage = 8;
  totalItems = this.searchResults.length;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize component
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedResults(): SearchResult[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.searchResults.slice(startIndex, startIndex + this.itemsPerPage);
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
