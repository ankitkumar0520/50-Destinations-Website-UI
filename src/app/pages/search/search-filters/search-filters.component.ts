import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  OnDestroy,
  Inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { SearchFilters, SearchService } from '../../../services/search.service';
import { DURATIONS, SORT_OPTIONS } from '../../../../enums/search-filters.enum';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

interface DestinationType {
  id: string;
  name: string;
  icon: string;
}

interface ExperienceType {
  id: string;
  value: string;
}

interface DistrictType {
  id: string;
  value: string;
}

interface Season {
  id: string;
  icon: string;
  name: string;
  month: string;
}

/**
 * SearchFiltersComponent handles all filtering functionality for the search page
 * including destination tags, seasons, duration, sorting, and search queries.
 * It manages both desktop and mobile views with responsive breakpoints.
 */
@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css',
})
export class SearchFiltersComponent implements OnInit, OnDestroy {
  // UI State Management
  showFilters = false;  // Controls visibility of filter modal
  isDarkMode = false;   // Tracks dark/light mode state
  private platformId: Object;  // Platform identifier for SSR compatibility
  private currentBreakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'lg';  // Current responsive breakpoint

  // Data Collections
  districts: DistrictType[] = [];  // List of available districts
  experiences: ExperienceType[] = [];  // List of experience types
  destinationTags: DestinationType[] = [];  // List of destination tags
  seasons: Season[] = [];  // List of seasons
  durations = DURATIONS;  // Available duration options
  sortOptions = SORT_OPTIONS;  // Available sorting options

  // Selected Filter States
  selectedDistrict: string = '';  // Currently selected district
  selectedExperience: string = '';  // Currently selected experience type
  searchQuery: string = '';  // Current search text
  private searchSubject = new Subject<string>();  // Subject for debounced search
  selectedTags: string[] = [];  // Array of selected destination tags
  allTags: string[] = [];  // Temporary storage for tags in filter modal
  selectedSeasons: string[] = [];  // Array of selected seasons
  selectedDurationId: string = '';  // Selected duration option
  minHours: number = 0;  // Minimum duration in hours
  maxHours: number = 9999;  // Maximum duration in hours
  selectedSort: string = '';  // Current sort option

  // Temporary States for Filter Modal
  selectedSorttemp: string = '';  // Temporary sort selection
  selectedDurationIdtemp: string = '';  // Temporary duration selection
  selectedSeasonstemp: string[] = [];  // Temporary seasons selection

  // Service Injections
  private searchService = inject(SearchService);  // Search service for filter updates
  private route = inject(ActivatedRoute);  // Route service for URL parameters

  /**
   * Constructor initializes the component with necessary services and sets up
   * dark mode detection and breakpoint tracking.
   */
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          this.isDarkMode = e.matches;
        });

      // Initialize breakpoint
      this.updateBreakpoint();
      // Add resize listener
      window.addEventListener('resize', () => this.updateBreakpoint());
    }

    this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((query) => {
        if (!this.enterPressed) {
          this.applyFilters();
        }
        this.enterPressed = false;
      });
  }

  private enterPressed = false;
  onEnterPress() {
    this.enterPressed = true;
    this.applyFilters(); // Trigger search immediately
  }
  /**
   * Handles search input changes with debouncing to prevent excessive API calls
   * @param query The search query string
   */
  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  /**
   * Determines the current responsive breakpoint based on window width
   * @returns The current breakpoint ('sm', 'md', 'lg', 'xl', or '2xl')
   */
  private updateBreakpoint() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const width = window.innerWidth;
    if (width < 640) this.currentBreakpoint = 'sm';
    else if (width < 768) this.currentBreakpoint = 'sm';
    else if (width < 1024) this.currentBreakpoint = 'md';
    else if (width < 1280) this.currentBreakpoint = 'lg';
    else if (width < 1536) this.currentBreakpoint = 'xl';
    else this.currentBreakpoint = '2xl';
  }

  /**
   * Determines the current responsive breakpoint based on window width
   * @returns The current breakpoint ('sm', 'md', 'lg', 'xl', or '2xl')
   */
  getTailwindBreakpoint(): 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
    if (!isPlatformBrowser(this.platformId)) return 'lg';
    return this.currentBreakpoint;
  }
  
  /**
   * Initializes the component by subscribing to filter updates and loading initial data
   */
  ngOnInit() {
    this.searchService.filters$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((filters: SearchFilters) => {
        this.selectedTags = filters.destinationtypeids || [];
        // Initialize temp variables with current values
        this.selectedSorttemp = this.selectedSort;
        this.selectedDurationIdtemp = this.selectedDurationId;
        this.selectedSeasonstemp = [...this.selectedSeasons];
      });

    this.getDestinationTags();
    this.getExperienceTags();
    this.getDistricts();
    this.getSeasons();
  }

  private destroy$ = new Subject<void>();

  /**
   * Sets the district filter based on URL parameters
   */
  setDistrictWithUrl() {
    // In your component.ts
    this.route.paramMap.subscribe((params) => {
      const districtParam = params.get('district');
      if (districtParam) {
        const matchedDistrict = this.districts.find(
          (d) => d.value.toLowerCase() === districtParam.toLowerCase()
        );

        if (matchedDistrict) {
          this.selectedDistrict = matchedDistrict.id; // or districtParam
          this.searchService.updateFilters({
            districtid: matchedDistrict.id,
          });
        } else {
          console.warn('District not found in list:', districtParam);
          // Optionally handle this case (e.g., show message or ignore)
        }
      }
    });
  }

  /**
   * Fetches all destination tags from the API
   */
  getDestinationTags() {
    this.apiService.get('Master/GetAllDestinationTypes').subscribe({
      next: (response: any) => {
        this.destinationTags = response.map((tag: any) => ({
          id: tag.destinationtypeid,
          name: tag.destinationtypename,
          icon: tag.icon,
        }));
      },
      error: (error) => {
        console.error('Error fetching destination tags:', error);
      },
    });
  }

  /**
   * Fetches all experience types from the API
   */
  getExperienceTags() {
    this.apiService.get('Master/GetAllExpeiences').subscribe({
      next: (response: any) => {
        this.experiences = response.map((experience: any) => ({
          id: experience.experienceid,
          value: experience.experiencename,
        }));
      },
      error: (error) => {
        console.error('Error fetching experience tags:', error);
      },
    });
  }

  /**
   * Fetches all districts from the API
   */
  getDistricts() {
    this.apiService.get('Master/GetAllDistricts').subscribe({
      next: (response: any) => {
        this.districts = response.map((district: any) => ({
          id: district.districtid,
          value: district.districtname,
        }));
        this.setDistrictWithUrl();
      },
      error: (error) => {
        console.error('Error fetching districts:', error);
      },
    });
  }

  /**
   * Fetches all seasons from the API
   */
  getSeasons() {
    this.apiService.get('Master/GetAllSeasons').subscribe({
      next: (response: any) => {
        this.seasons = response.map((season: any) => ({
          id: season.seasonid,
          seasonicon: season.icon,
          name: season.seasonname,
          month: season.seasonmonth,
        }));
      },
      error: (error) => {
        console.error('Error fetching seasons:', error);
      },
    });
  }

  /**
   * Toggles the filter modal visibility
   */
  toggleFilters() {
    this.showFilters = !this.showFilters;
    if(this.showFilters){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Toggles a destination tag selection
   * @param tagId The ID of the tag to toggle
   */
  toggleTag(tagId: string) {
    if (this.selectedTags.includes(tagId)) {
      this.selectedTags = this.selectedTags.filter((tag) => tag !== tagId);
    } else {
      this.selectedTags.push(tagId);
    }

    this.applyFilters();
  }

  /**
   * Toggles a tag selection in the filter modal
   * @param tagId The ID of the tag to toggle
   */
  toggleAllTagsfromFilterModal(tagId: string) {
     this.allTags=this.selectedTags;
    if (this.allTags.includes(tagId)) {
      this.allTags = this.allTags.filter((tag:any) => tag !== tagId);
    } else {
        this.allTags.push(tagId);
    }
  }

  /**
   * Applies all selected tags from the filter modal
   */
  applyAllTagsfromFilterModal() {
    this.showFilters = false; // Close the filter modal
    this.selectedTags = this.allTags; // Apply all tags
  }

  /**
   * Toggles a season selection
   * @param seasonId The ID of the season to toggle
   */
  toggleSeason(seasonId: string) {
    if (this.selectedSeasons.includes(seasonId)) {
      this.selectedSeasons = this.selectedSeasons.filter(
        (season) => season !== seasonId
      );
    } else {
      this.selectedSeasons.push(seasonId);
    }
  }

  /**
   * Selects a duration option
   * @param durationId The ID of the duration to select
   */
  selectDuration(durationId: string) {
    this.selectedDurationId =
      this.selectedDurationId === durationId ? '' : durationId;
  }

  /**
   * Clears all filter selections
   */
  clearFilters() {
    this.selectedSort = '';
    this.selectedSorttemp = '';
    this.selectedSeasons = [];
    this.selectedSeasonstemp = [];
    this.selectedDurationId = '';
    this.selectedDurationIdtemp = '';
    this.allTags = [];
    if(this.getTailwindBreakpoint() === 'sm'){
      this.selectedTags = [];
    }
    this.applyFilters();


    this.toggleFilters();
  }

  /**
   * Clears all search section filters including district, experience, and search query
   */
  clearSearchSection() {

    // clear all the filters in the search section from the search filters component
    this.selectedDistrict = '';
    this.selectedExperience = '';
    this.searchQuery = '';
    this.selectedTags = [];


    this.clearFilters();
    this.applyFilters();

  }

  /**
   * Applies all current filter selections
   */
  onSearch() {
    this.applyFilters();
  }

  /**
   * Applies all current filter selections
   */
  applyFilters() {
    this.selectedSort = this.selectedSorttemp; // for sorting temp value to be used in the search
    this.selectedDurationId =
      this.selectedDurationId === '' ? '' : this.selectedDurationId;
    const selected = DURATIONS.find((d) => d.name === this.selectedDurationId);

    this.searchService.updateFilters({
      districtid: this.selectedDistrict,
      experienceids: this.selectedExperience,
      searchtext: this.searchQuery,
      destinationtypeids: this.selectedTags,
      sortby: this.selectedSort,
      seasonids: this.selectedSeasons,
      min_durationinhrs: selected?.min ?? 0,
      max_durationinhrs: selected?.max ?? 9999,
    });
  }

  /**
   * Gets the name of a season by its ID
   * @param seasonId The ID of the season
   * @returns The name of the season
   */
  getSeasonName(seasonId: string): string {
    const season = this.seasons.find(s => s.id === seasonId);
    return season ? season.name : '';
  }

  /**
   * Gets the name of a sort option by its ID
   * @param sortId The ID of the sort option
   * @returns The name of the sort option
   */
  getSortOptionName(sortId: string): string {
    const option = this.sortOptions.find(opt => opt.id === sortId);
    return option ? option.name : '';
  }

  /**
   * Gets the icon for a tag by its ID
   * @param tagId The ID of the tag
   * @returns The icon class for the tag
   */
  getTagIcon(tagId: string): string {
    const tag = this.destinationTags.find(t => t.id === tagId);
    return tag ? tag.icon : '';
  }

  /**
   * Gets the formatted name for a tag by its ID
   * @param tagId The ID of the tag
   * @returns The formatted name of the tag
   */
  getTagName(tagId: string): string {
    const tag = this.destinationTags.find(t => t.id === tagId);
    return tag ? tag.name.split(" ").slice(0, 3).join(" ") : '';
  }

  /**
   * Selects a duration option in the filter modal
   * @param durationId The ID of the duration to select
   */
  selectDurationtemp(durationId: string) {
    this.selectedDurationIdtemp = this.selectedDurationIdtemp === durationId ? '' : durationId;
  }

  /**
   * Toggles a season selection in the filter modal
   * @param seasonId The ID of the season to toggle
   */
  toggleSeasontemp(seasonId: string) {
    if (this.selectedSeasonstemp.includes(seasonId)) {
      this.selectedSeasonstemp = this.selectedSeasonstemp.filter(id => id !== seasonId);
    } else {
      this.selectedSeasonstemp.push(seasonId);
    }
  }

  /**
   * Applies all filter selections from the modal
   */
  applyFiltersFromModal() {

    this.showFilters = false;
    document.body.style.overflow = 'auto';

    this.selectedSort = this.selectedSorttemp;
    this.selectedDurationId = this.selectedDurationIdtemp;
    this.selectedSeasons = [...this.selectedSeasonstemp];
    this.applyFilters();

  }

  /**
   * Cleanup method called when component is destroyed
   */
  ngOnDestroy() {
    // Reset only tag filters when component is destroyed
    this.searchService.resetTagFilters();
    this.searchSubject.complete();
    this.destroy$.next();
    this.destroy$.complete();

    // Remove resize listener
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', () => this.updateBreakpoint());
    }
  }
}
