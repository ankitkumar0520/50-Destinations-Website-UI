import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  // Dropdown values
  districts = ['Gangtok', 'Namchi', 'Soreng', 'Mangan', 'Gyalshing', 'Pakyong'];

  experiences = [
    'Adventure',
    'Trekking',
    'Spiritual Retreats',
    'Wildlife & Nature',
    'Cultural Tours',
    'Scenic Drives',
    'Camping',
    'Pilgrimage Journeys',
    'Photography Spots',
    'Festivals & Celebrations',
    'Snow Activities',
    'Bird Watching',
  ];

  destinationTags = [
    { id: 'monasteries', name: 'Monasteries', icon: 'fa-solid fa-place-of-worship' },
    { id: 'lakes', name: 'Lakes', icon: 'fa-solid fa-water' },
    { id: 'viewpoints', name: 'Viewpoints', icon: 'fa-solid fa-binoculars' },
    { id: 'trekking', name: 'Trekking', icon: 'fa-solid fa-person-hiking' },
    { id: 'wildlife', name: 'Wildlife', icon: 'fa-solid fa-paw' },
    { id: 'waterfalls', name: 'Waterfalls', icon: 'fa-solid fa-water' },
    { id: 'hotsprings', name: 'Hot Springs', icon: 'fa-solid fa-fire' },
    { id: 'temples', name: 'Temples', icon: 'fa-solid fa-gopuram' },
  ];

  seasons = [
    { id: 'spring', name: 'Spring (March - May)', icon: 'fa-seedling' },
    { id: 'summer', name: 'Summer (June - August)', icon: 'fa-sun' },
    { id: 'monsoon', name: 'Monsoon (July - September)', icon: 'fa-cloud-rain' },
    { id: 'autumn', name: 'Autumn (September - November)', icon: 'fa-leaf' },
    { id: 'winter', name: 'Winter (December - February)', icon: 'fa-snowflake' },
  ];

  durations = [
    { id: '0-3', name: '0-3 hours', min: 0, max: 3 },
    { id: '3-6', name: '3-6 hours', min: 3, max: 6 },
    { id: '1-day', name: 'Full day', min: 6, max: 12 },
    { id: '2-3-days', name: '2-3 days', min: 24, max: 72 },
    { id: '4-plus', name: '4+ days', min: 96, max: 1000 },
  ];

  sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' },
  ];

  // Selected filters
  selectedDistrict: string = '';
  selectedExperience: string = '';
  searchQuery: string = '';
  selectedTags = new Set<string>();
  selectedSeasons = new Set<string>();
  selectedDurationId: string = ''; // id from durations array
  selectedSort: string = '';


  private searchService = inject(SearchService);

  constructor() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.isDarkMode = e.matches;
    });
  }

  ngOnInit() {
    const currentFilters = this.searchService.getFilters();
    this.selectedDistrict = currentFilters.district;
    this.selectedExperience = currentFilters.experienceType;
    this.searchQuery = currentFilters.searchQuery;
    this.selectedTags = new Set(currentFilters.tags);
    this.selectedSeasons = new Set(currentFilters.seasons);

    // Determine duration id based on current filter values
    const match = this.durations.find(
      d => d.min === currentFilters.durations.minHours && d.max === currentFilters.durations.maxHours
    );
    this.selectedDurationId = match?.id ?? '';

    this.selectedSort = currentFilters.sort;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleTag(tagId: string) {
    this.selectedTags.has(tagId)
      ? this.selectedTags.delete(tagId)
      : this.selectedTags.add(tagId);
  }

  toggleSeason(seasonId: string) {
    this.selectedSeasons.has(seasonId)
      ? this.selectedSeasons.delete(seasonId)
      : this.selectedSeasons.add(seasonId);
  }

  selectDuration(durationId: string) {
    this.selectedDurationId = this.selectedDurationId === durationId ? '' : durationId;
  }



  clearFilters() {
    this.selectedSort = '';
    this.selectedSeasons.clear();
    this.selectedDurationId = '';
    this.applyFilters();
  }

  clearSearchSection() {
    this.selectedDistrict = '';
    this.selectedExperience = '';
    this.searchQuery = '';
    this.selectedTags.clear();
    this.applyFilters();
  }


  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    const duration = this.durations.find(d => d.id === this.selectedDurationId);

    this.searchService.updateFilters({
      district: this.selectedDistrict,
      experienceType: this.selectedExperience,
      searchQuery: this.searchQuery,
      tags: Array.from(this.selectedTags),
      sort: this.selectedSort,
      seasons: Array.from(this.selectedSeasons),
      durations: duration
        ? { minHours: duration.min, maxHours: duration.max }
        : { minHours: 0, maxHours: 0 },
    });
  }
}
