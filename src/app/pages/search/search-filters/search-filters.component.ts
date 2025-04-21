import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { SearchService } from '../../../services/search.service';
import {
  DESTINATIONS_TAGS,
  DISTRICT_OPTIONS,
  DURATIONS,
  EXPERIENCE_OPTIONS,
  SEASONS,
  SORT_OPTIONS,
} from '../../../../enums/search-filters.enum';
import { ActivatedRoute } from '@angular/router';

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

  districts = DISTRICT_OPTIONS;

  experiences = EXPERIENCE_OPTIONS;

  destinationTags = DESTINATIONS_TAGS;

  seasons = SEASONS;

  durations = DURATIONS;

  sortOptions = SORT_OPTIONS;

  // Selected filters
  selectedDistrict: string = '';
  selectedExperience: string = '';
  searchQuery: string = '';
  selectedTags = new Set<string>();
  selectedSeasons = new Set<string>();
  selectedDurationId: string = ''; // id from durations array
  selectedSort: string = '';

  private searchService = inject(SearchService);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          this.isDarkMode = e.matches;
        });
    }
  }

  ngOnInit() {
    // Get district from URL parameter
    this.route.paramMap.subscribe((params) => {
      const districtParam = params.get('district');
      if (districtParam) {
        this.selectedDistrict = districtParam;
        this.searchService.updateFilters({
          district: districtParam,
        });
      }
    });

    const currentFilters = this.searchService.getFilters();

    this.selectedDistrict = currentFilters.district;
    this.selectedExperience = currentFilters.experienceType;
    this.searchQuery = currentFilters.searchQuery;
    this.selectedTags = new Set(currentFilters.tags);
    this.selectedSeasons = new Set(currentFilters.seasons);

    // Determine duration id based on current filter values
    const match = this.durations.find(
      (d) =>
        d.min === currentFilters.durations.minHours &&
        d.max === currentFilters.durations.maxHours
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
    this.selectedDurationId =
      this.selectedDurationId === durationId ? '' : durationId;
  }

  clearFilters() {
    this.selectedSort = '';
    this.selectedSeasons.clear();
    this.selectedDurationId = '';
    this.applyFilters();
    this.showFilters = false;
  }

  clearSearchSection() {
    this.selectedDistrict = '';
    this.selectedExperience = '';
    this.searchQuery = '';
    this.selectedTags.clear();
    this.applyFilters();
    this.clearFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    const duration = this.durations.find(
      (d) => d.id === this.selectedDurationId
    );
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
