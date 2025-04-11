import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent implements OnInit {
  showFilters = false;
  isDarkMode = false;

  districts = [
    'Gangtok',
    'Namchi',
    'Soreng',
    'Mangan',
    'Gyalshing',
    'Pakyong'
  ];

  experiences = [
    "Adventure",
    "Trekking",
    "Spiritual Retreats",
    "Wildlife & Nature",
    "Cultural Tours",
    "Scenic Drives",
    "Eco-Tourism",
    "Camping",
    "Food & Culinary Trails",
    "Historical Walks",
    "Pilgrimage Journeys",
    "Photography Spots",
    "Festivals & Celebrations",
    "Snow Activities",
    "Bird Watching",
  ];

  destinationTags = [
    { id: 'monasteries', name: 'Monasteries', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'lakes', name: 'Lakes', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
    { id: 'viewpoints', name: 'Viewpoints', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'trekking', name: 'Trekking', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'wildlife', name: 'Wildlife', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'waterfalls', name: 'Waterfalls', icon: 'M12 19V5M5 12l7-7 7 7M5 19l7-7 7 7' },
    { id: 'hotsprings', name: 'Hot Springs', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
    { id: 'temples', name: 'Temples', icon: 'M3 21h18M3 10h18M3 7l9-4 9 4M4 10h2v11H4V10zm14 0h2v11h-2V10z' }
  ];

  selectedDistrict: string = '';
  selectedExperience: string = '';
  searchQuery: string = '';
  selectedTags: Set<string> = new Set();
  selectedSort = '';
  selectedRating: number | null = null;
  selectedSeasons: Set<string> = new Set();
  selectedDurations: Set<string> = new Set();

  constructor(private searchService: SearchService) {
    // Check for dark mode preference
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Listen for dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.isDarkMode = e.matches;
    });
  }

  ngOnInit() {
    // Initialize with current filter state
    const currentFilters = this.searchService.getFilters();
    this.selectedDistrict = currentFilters.district;
    this.selectedExperience = currentFilters.experience;
    this.searchQuery = currentFilters.searchQuery;
    this.selectedTags = new Set(currentFilters.tags);
    this.selectedSort = currentFilters.sort;
    this.selectedSeasons = new Set(currentFilters.seasons);
    this.selectedDurations = new Set(currentFilters.durations);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleTag(tagId: string) {
    if (this.selectedTags.has(tagId)) {
      this.selectedTags.delete(tagId);
    } else {
      this.selectedTags.add(tagId);
    }
    this.applyFilters();
  }

  clearFilters() {
    this.selectedSort = '';
    this.selectedRating = null;
    this.selectedSeasons.clear();
    this.selectedDurations.clear();
    this.applyFilters();
  }

  clearSearchSection() {
    this.selectedDistrict = '';
    this.selectedExperience = '';
    this.searchQuery = '';
    this.selectedTags.clear();
    this.applyFilters();
  }

  clearTags() {
    this.selectedTags.clear();
    this.applyFilters();
  }

  onSearch() {
    console.log('Search triggered with:', {
      district: this.selectedDistrict,
      experience: this.selectedExperience,
      query: this.searchQuery,
      tags: Array.from(this.selectedTags)
    });
    this.applyFilters();
  }

  // Sort options
  sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' }
  ];

  // Rating filter
  ratings = [5, 4, 3, 2, 1];

  // Season filter
  seasons = [
    { id: 'spring', name: 'Spring (March - May)' },
    { id: 'summer', name: 'Summer (June - August)' },
    { id: 'monsoon', name: 'Monsoon (July - September)' },
    { id: 'autumn', name: 'Autumn (September - November)' },
    { id: 'winter', name: 'Winter (December - February)' }
  ];

  // Duration filter
  durations = [
    { id: '0-3', name: '0-3 hours' },
    { id: '3-6', name: '3-6 hours' },
    { id: '1-day', name: 'Full day' },
    { id: '2-3-days', name: '2-3 days' },
    { id: '4-plus', name: '4+ days' }
  ];

  toggleSeason(seasonId: string) {
    if (this.selectedSeasons.has(seasonId)) {
      this.selectedSeasons.delete(seasonId);
    } else {
      this.selectedSeasons.add(seasonId);
    }
    this.applyFilters();
  }

  toggleDuration(durationId: string) {
    if (this.selectedDurations.has(durationId)) {
      this.selectedDurations.delete(durationId);
    } else {
      this.selectedDurations.clear(); // Only allow one duration selection
      this.selectedDurations.add(durationId);
    }
    this.applyFilters();
  }

  setRating(rating: number | null) {
    this.selectedRating = this.selectedRating === rating ? null : rating;
    this.applyFilters();
  }

  applyFilters() {
    console.log('Applying filters:', {
      district: this.selectedDistrict,
      experience: this.selectedExperience,
      searchQuery: this.searchQuery,
      tags: Array.from(this.selectedTags),
      sort: this.selectedSort,
      seasons: Array.from(this.selectedSeasons),
      durations: Array.from(this.selectedDurations)
    });

    this.searchService.updateFilters({
      district: this.selectedDistrict,
      experience: this.selectedExperience,
      searchQuery: this.searchQuery,
      tags: this.selectedTags,
      sort: this.selectedSort,
      seasons: this.selectedSeasons,
      durations: this.selectedDurations
    });
  }
}
