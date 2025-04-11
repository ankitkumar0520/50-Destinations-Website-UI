import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css',
})
export class SearchFiltersComponent implements OnInit {
  showFilters = false;
  isDarkMode = false;

  districts = ['Gangtok', 'Namchi', 'Soreng', 'Mangan', 'Gyalshing', 'Pakyong'];

  experiences = [
    'Adventure',
    'Trekking',
    'Spiritual Retreats',
    'Wildlife & Nature',
    'Cultural Tours',
    'Scenic Drives',
    'Eco-Tourism',
    'Camping',
    'Food & Culinary Trails',
    'Historical Walks',
    'Pilgrimage Journeys',
    'Photography Spots',
    'Festivals & Celebrations',
    'Snow Activities',
    'Bird Watching',
  ];

  destinationTags = [
    {
      id: 'monasteries',
      name: 'Monasteries',
      icon: 'fa-solid fa-place-of-worship',
    }, // closest free alternative
    { id: 'lakes', name: 'Lakes', icon: 'fa-solid fa-water' },
    { id: 'viewpoints', name: 'Viewpoints', icon: 'fa-solid fa-binoculars' }, // viewpoint alternative
    { id: 'trekking', name: 'Trekking', icon: 'fa-solid fa-person-hiking' },
    { id: 'wildlife', name: 'Wildlife', icon: 'fa-solid fa-paw' },
    { id: 'waterfalls', name: 'Waterfalls', icon: 'fa-solid fa-water' }, // no waterfall icon in free version
    { id: 'hotsprings', name: 'Hot Springs', icon: 'fa-solid fa-fire' }, // closest free match
    { id: 'temples', name: 'Temples', icon: 'fa-solid fa-gopuram' }, // temple-style structure
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
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
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
      tags: Array.from(this.selectedTags),
    });
    this.applyFilters();
  }

  // Sort options
  sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' },
  ];

  // Rating filter
  ratings = [5, 4, 3, 2, 1];

  // Season filter
  seasons = [
    { id: 'spring', name: 'Spring (March - May)', icon: 'fa-seedling' },
    { id: 'summer', name: 'Summer (June - August)', icon: 'fa-sun' },
    {
      id: 'monsoon',
      name: 'Monsoon (July - September)',
      icon: 'fa-cloud-rain',
    },
    { id: 'autumn', name: 'Autumn (September - November)', icon: 'fa-leaf' },
    {
      id: 'winter',
      name: 'Winter (December - February)',
      icon: 'fa-snowflake',
    },
  ];

  // Duration filter
  durations = [
    { id: '0-3', name: '0-3 hours' },
    { id: '3-6', name: '3-6 hours' },
    { id: '1-day', name: 'Full day' },
    { id: '2-3-days', name: '2-3 days' },
    { id: '4-plus', name: '4+ days' },
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
      durations: Array.from(this.selectedDurations),
    });

    this.searchService.updateFilters({
      district: this.selectedDistrict,
      experience: this.selectedExperience,
      searchQuery: this.searchQuery,
      tags: this.selectedTags,
      sort: this.selectedSort,
      seasons: this.selectedSeasons,
      durations: this.selectedDurations,
    });
  }
}
