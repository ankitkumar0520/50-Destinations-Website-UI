import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SearchFilters {
  district: string;
  experience: string;
  searchQuery: string;
  tags: Set<string>;
  sort: string;
  seasons: Set<string>;
  durations: Set<string>;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private filtersSubject = new BehaviorSubject<SearchFilters>({
    district: '',
    experience: '',
    searchQuery: '',
    tags: new Set(),
    sort: '',
    seasons: new Set(),
    durations: new Set()
  });

  filters$ = this.filtersSubject.asObservable();

  updateFilters(filters: Partial<SearchFilters>) {
    console.log('Updating filters with:', filters); // Debug log
    const currentFilters = this.filtersSubject.value;
    const newFilters = {
      ...currentFilters,
      ...filters,
      tags: filters.tags || currentFilters.tags,
      seasons: filters.seasons || currentFilters.seasons,
      durations: filters.durations || currentFilters.durations
    };
    console.log('New filter state:', newFilters); // Debug log
    this.filtersSubject.next(newFilters);
  }

  getFilters(): SearchFilters {
    return this.filtersSubject.value;
  }
} 