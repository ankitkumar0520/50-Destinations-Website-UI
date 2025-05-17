import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface SearchFilters {
  districtid: string;
  experienceids: string;
  searchtext: string;
  destinationtypeids: string[];
  sortby: string;
  seasonids: string[];
  min_durationinhrs: number;
  max_durationinhrs: number;
  pageSize: number;
  pageNumber: number;
}

export const DEFAULT_FILTERS: SearchFilters = {
  districtid: '',
  experienceids: '',
  searchtext: '',
  destinationtypeids: [],
  sortby: '',
  seasonids: [],
  min_durationinhrs: 0,
  max_durationinhrs: 9999,
  pageSize: 8,
  pageNumber: 1,
};

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private filtersSubject = new BehaviorSubject<SearchFilters>({
    ...DEFAULT_FILTERS,
  });
  private payloadSubject = new BehaviorSubject<any>({});

  // Public observables
  payload$ = this.payloadSubject.asObservable();
  filters$ = this.filtersSubject.asObservable();

  // Store filtered results as observable if needed by multiple components
  private filteredResultsSubject = new BehaviorSubject<any>(null);
  filteredResults$ = this.filteredResultsSubject.asObservable();

  constructor() {
    // Automatically update payload when filters change
    this.filtersSubject.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updatePayload();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.resetFilters(); // Reset filters when service is destroyed
  }

  // Add new method to reset only tag filters
  resetTagFilters(): void {
    const current = this.filtersSubject.value;
    this.filtersSubject.next({
      ...current,
      destinationtypeids: [],
    });
  }

  updateFilters(updated: Partial<SearchFilters>): void {
    const current = this.filtersSubject.value;
    const merged: SearchFilters = {
      ...current,
      ...updated,
      destinationtypeids:
        updated.destinationtypeids ?? current.destinationtypeids,
      seasonids: updated.seasonids ?? current.seasonids,
      min_durationinhrs: updated.min_durationinhrs ?? current.min_durationinhrs,
      max_durationinhrs: updated.max_durationinhrs ?? current.max_durationinhrs,
      pageSize: updated.pageSize ?? current.pageSize,
      pageNumber: updated.pageNumber ?? current.pageNumber,
      sortby: updated.sortby ?? current.sortby,
    };
    this.filtersSubject.next(merged);
  }

  setFilters(newFilters: SearchFilters): void {
    this.filtersSubject.next({ ...newFilters });
  }

  resetFilters(): void {
    this.filtersSubject.next({ ...DEFAULT_FILTERS });
  }

  getCurrentFilters(): SearchFilters {
    return this.filtersSubject.value;
  }

  setFilteredResults(results: any): void {
    this.filteredResultsSubject.next(results);
  }

  private updatePayload(): void {
    const filters = this.filtersSubject.value;
    const payload: any = {};

    if (filters.destinationtypeids?.length) {
      payload.destinationtypeids = filters.destinationtypeids.join(',');
    }

    if (filters.districtid) {
      payload.districtid = filters.districtid;
    }

    payload.min_durationinhrs = filters.min_durationinhrs;
    payload.max_durationinhrs = filters.max_durationinhrs;

    if (filters.seasonids?.length) {
      payload.seasonids = filters.seasonids.join(',');
    }

    if (filters.experienceids) {
      payload.experienceids = filters.experienceids;
    }

    if (filters.searchtext) {
      payload.searchtext = filters.searchtext;
    }

    if (filters.sortby) {
      payload.sortby = filters.sortby;
    }

    if (filters.pageSize) {
      payload.pageSize = filters.pageSize;
    }

    if (filters.pageNumber) {
      payload.pageNumber = filters.pageNumber;
    }

    this.payloadSubject.next(payload);
  }
}
