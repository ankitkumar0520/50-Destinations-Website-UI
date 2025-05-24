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

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css',
})
export class SearchFiltersComponent implements OnInit, OnDestroy {
  showFilters = false;
  isDarkMode = false;
  private platformId: Object;

  districts: DistrictType[] = [];

  experiences: ExperienceType[] = [];

  destinationTags: DestinationType[] = [];

  seasons: Season[] = [];

  durations = DURATIONS;

  sortOptions = SORT_OPTIONS;

  // Selected filters
  selectedDistrict: string = '';
  selectedExperience: string = '';
  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  selectedTags: string[] = [];
  selectedSeasons: string[] = [];
  selectedDurationId: string = ''; // id from durations array
  minHours: number = 0;
  maxHours: number = 9999;
  selectedSort: string = '';

  private searchService = inject(SearchService);
  private route = inject(ActivatedRoute);

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
  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  ngOnInit() {
    this.searchService.filters$
      .pipe(
        takeUntil(this.destroy$) // Don't forget to manage subscription cleanup
      )
      .subscribe((filters: SearchFilters) => {
        this.selectedTags = filters.destinationtypeids || [];
      });

    this.getDestinationTags();
    this.getExperienceTags();
    this.getDistricts();
    this.getSeasons();
  }

  private destroy$ = new Subject<void>();

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

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleTag(tagId: string) {
    if (this.selectedTags.includes(tagId)) {
      this.selectedTags = this.selectedTags.filter((tag) => tag !== tagId);
    } else {
      this.selectedTags.push(tagId);
    }

    this.applyFilters();
  }

  toggleSeason(seasonId: string) {
    if (this.selectedSeasons.includes(seasonId)) {
      this.selectedSeasons = this.selectedSeasons.filter(
        (season) => season !== seasonId
      );
    } else {
      this.selectedSeasons.push(seasonId);
    }
  }

  selectDuration(durationId: string) {
    this.selectedDurationId =
      this.selectedDurationId === durationId ? '' : durationId;
  }

  clearFilters() {
    this.selectedSort = '';
    this.selectedSeasons = [];
    this.selectedDurationId = '';
    this.applyFilters();
    this.showFilters = false;
  }

  clearSearchSection() {
    this.selectedDistrict = '';
    this.selectedExperience = '';
    this.searchQuery = '';
    this.selectedTags = [];
    this.applyFilters();
    this.clearFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
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

  ngOnDestroy() {
    // Reset only tag filters when component is destroyed
    this.searchService.resetTagFilters();
    this.searchSubject.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
