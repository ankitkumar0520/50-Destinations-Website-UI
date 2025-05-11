import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
export class SearchService {
  private filtersSubject = new BehaviorSubject<SearchFilters>({ ...DEFAULT_FILTERS });
  private payloadSubject = new BehaviorSubject<any>({});
  payload$ = this.payloadSubject.asObservable();

  filteredResults: any;

  constructor() {
    this.UpdatePayload();
  }



  updateFilters(updated: Partial<SearchFilters>) {
    const current = this.filtersSubject.value;
    const merged: SearchFilters = {
      ...current,
      ...updated,
      destinationtypeids: updated.destinationtypeids ?? current.destinationtypeids,
      seasonids: updated.seasonids ?? current.seasonids,
      min_durationinhrs: updated.min_durationinhrs ?? current.min_durationinhrs,
      max_durationinhrs: updated.max_durationinhrs ?? current.max_durationinhrs,
      pageSize: updated.pageSize ?? current.pageSize,
      pageNumber: updated.pageNumber ?? current.pageNumber,
      sortby: updated.sortby ?? current.sortby,


    };
    this.filtersSubject.next(merged);

    this.UpdatePayload();
  }

  setFilters(newFilters: SearchFilters) {
    this.filtersSubject.next({ ...newFilters });
  }

  resetFilters() {
    this.filtersSubject.next({ ...DEFAULT_FILTERS });
    this.UpdatePayload();
  }


  UpdatePayload(): any {
    const payload: any = {};
    const filters = this.filtersSubject.value;
   
    if(filters.destinationtypeids?.length){
      //map destinationtypeids to string separated by comma
      payload.destinationtypeids = filters.destinationtypeids.join(',');
    }


    if (filters.districtid) {
      payload.districtid = filters.districtid;
    }

     payload.min_durationinhrs = filters.min_durationinhrs;
     payload.max_durationinhrs = filters.max_durationinhrs;
  
    if (filters.seasonids?.length) {
      //map seasonids to string separated by comma
      payload.seasonids = filters.seasonids.join(',');
    }
  
    if (filters?.experienceids) {
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
    return payload;
  }
  



}
