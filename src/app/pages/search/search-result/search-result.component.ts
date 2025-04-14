import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchFilters, SearchService } from '../../../services/search.service';
import { NgxPaginationModule } from 'ngx-pagination';

export interface ResultItem {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  location: string;
  tags: string[];
}

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit {

  filters: SearchFilters | null = null;
  filteredResults: ResultItem[] = [];
  paginatedResults: ResultItem[] = [];
  currentPage = 1;
  itemsPerPage = 4;

  private searchService = inject(SearchService);
  searchResults: ResultItem[] = this.searchService.dummyResults;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchService.filters$.subscribe({
      next: (filters) => {
        this.filters = filters;
        this.applyFilters(filters); // Apply filters once received
      },
      error: (err) => console.error('Error loading filters:', err),
      complete: () => console.log('Filters stream completed'),
    });
  }

  applyFilters(filters: SearchFilters): void {
    this.filteredResults = this.searchResults.filter((result: ResultItem) => {
      const matchesDistrict =
        !filters.district || result.location?.toLowerCase() === filters.district.toLowerCase();

      const matchesSearch =
        !filters.searchQuery ||
        result.title?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        result.description?.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesTags =
        !filters.tags || filters.tags.length === 0 ||
        filters.tags.some(tag =>
          result.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
        );

      const matchesExperience =
        !filters.experienceType ||
        result.tags?.map(t => t.toLowerCase()).includes(filters.experienceType.toLowerCase());

      const matchesSeasons =
        !filters.seasons || filters.seasons.length === 0 ||
        filters.seasons.some(season =>
          result.tags?.map(t => t.toLowerCase()).includes(season.toLowerCase())
        );

      const resultDurationHours = this.getHoursFromDuration(result.duration);
      const matchesDuration =
        (!filters.durations?.minHours || resultDurationHours >= filters.durations.minHours) &&
        (!filters.durations?.maxHours || resultDurationHours <= filters.durations.maxHours);

      return (
        matchesDistrict &&
        matchesSearch &&
        matchesTags &&
        matchesExperience &&
        matchesSeasons &&
        matchesDuration
      );
    });
  }

  getHoursFromDuration(duration: string): number {
    const daysMatch = duration.match(/(\d+)\s*day/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 0;
    return days * 24;
  }

  navigateToDetail(id: number): void {
    // redirect to main destination page (implement routing as needed)
    this.router.navigate(['/destination', id]);
  }


}
