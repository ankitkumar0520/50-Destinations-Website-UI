import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DurationRange {
  minHours: number;
  maxHours: number;
}

export interface SearchFilters {
  district: string;
  experienceType: string;
  searchQuery: string;
  tags: string[];
  sort: string;
  seasons: string[];
  durations: DurationRange;
}

const DEFAULT_FILTERS: SearchFilters = {
  district: '',
  experienceType: '',
  searchQuery: '',
  tags: [],
  sort: '',
  seasons: [],
  durations: {
    minHours: 0,
    maxHours: 0
  }
};



@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private filtersSubject = new BehaviorSubject<SearchFilters>({ ...DEFAULT_FILTERS });
  // Observable for subscribing to filter changes
  filters$ = this.filtersSubject.asObservable();

  // Get current filters
  getFilters(): SearchFilters {
    return this.filtersSubject.value;
  }

  // Update filters - merges with current filters
  updateFilters(updated: Partial<SearchFilters>) {
    const current = this.getFilters();
    const merged: SearchFilters = {
      ...current,
      ...updated,
      tags: updated.tags ?? current.tags,
      seasons: updated.seasons ?? current.seasons,
      durations: {
        ...current.durations,
        ...updated.durations
      }
    };

    this.filtersSubject.next(merged);
    alert(JSON.stringify(merged))
  }

  // Replace filters completely (optional)
  setFilters(newFilters: SearchFilters) {
    this.filtersSubject.next({ ...newFilters });
  }

  // Reset to default
  resetFilters() {
    this.filtersSubject.next({ ...DEFAULT_FILTERS });
  }




  getDestinations() {
    return [
      // 1. Gangtok District (Capital)
      {
        id: 1,
        title: "Tsomgo Lake & Baba Mandir",
        description: "Sacred glacial lake at 12,400ft with Baba Harbhajan Singh's shrine. Protected area permit required.",
        image: "https://example.com/sikkim/tsomgo-baba.jpg",
        duration: "Full day",
        location: "Gangtok",
        tags: ["Permit Required", "High Altitude", "Buddhist"],
      },

      // 2. Mangan District (North)
      {
        id: 2,
        title: "Gurudongmar Lake",
        description: "One of the world's highest lakes at 17,800ft, sacred to Buddhists and Sikhs.",
        image: "https://example.com/sikkim/gurudongmar.jpg",
        duration: "2 days",
        location: "Mangan",
        tags: ["Permit Required", "Extreme Altitude", "Pilgrimage"],
      },

      // 3. Namchi District (South)
      {
        id: 3,
        title: "Char Dham Complex",
        description: "Replica of India's four holy shrines with 108ft Shiva statue and panoramic views.",
        image: "https://example.com/sikkim/char-dham.jpg",
        duration: "Half day",
        location: "Namchi",
        tags: ["Hindu Pilgrimage", "Viewpoint", "Architecture"],
      },

      // 4. Gyalshing District (West)
      {
        id: 4,
        title: "Khecheopalri Lake",
        description: "Wish-fulfilling lake where leaves never float on the surface, surrounded by forests.",
        image: "https://example.com/sikkim/khecheopalri.jpg",
        duration: "3 hours",
        location: "Gyalshing",
        tags: ["Sacred Lake", "Nature", "Trekking"],
      },

      // 5. Pakyong District (East)
      {
        id: 5,
        title: "Pakyong Airport Viewpoint",
        description: "Himalaya's first greenfield airport with stunning runway valley views.",
        image: "https://example.com/sikkim/pakyong-airport.jpg",
        duration: "1 hour",
        location: "Pakyong",
        tags: ["Engineering Marvel", "Aviation", "Photography"],
      },

      // 6. Soreng District (Newest District)
      {
        id: 6,
        title: "Soreng Cherry Blossoms",
        description: "Annual spring bloom of wild Himalayan cherry trees in Sikkim's newest district.",
        image: "https://example.com/sikkim/soreng-cherry.jpg",
        duration: "Seasonal (March-April)",
        location: "Soreng",
        tags: ["Flowers", "Seasonal", "Nature"],
      }
    ];
  }





}
