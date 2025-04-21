import { Injectable } from '@angular/core';
import { BehaviorSubject, merge } from 'rxjs';

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

export interface ResultItem {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  location: string;
  tags: string[];
  experienceType: string;
  season: string;
  popularityIndex: number;
  addedOn: string;
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
    maxHours: 0,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private filtersSubject = new BehaviorSubject<SearchFilters>({
    ...DEFAULT_FILTERS,
  });
  // Observable for subscribing to filter changes
  filters$ = this.filtersSubject.asObservable();

  filteredResults: any;

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
        ...updated.durations,
      },
    };

    this.filtersSubject.next(merged);
  }

  // Replace filters completely (optional)
  setFilters(newFilters: SearchFilters) {
    this.filtersSubject.next({ ...newFilters });
  }

  // Reset to default
  resetFilters() {
    this.filtersSubject.next({ ...DEFAULT_FILTERS });
  }

  applyFilters(filters: SearchFilters, searchResults: any): any {
    this.filteredResults = searchResults.filter((result: ResultItem) => {
      const matchesDistrict =
        !filters.district ||
        result.location?.toLowerCase() === filters.district.toLowerCase();

      const matchesSearch =
        !filters.searchQuery ||
        result.title
          ?.toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        result.description
          ?.toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      const matchesTags =
        !filters.tags ||
        filters.tags.length === 0 ||
        filters.tags.some((tag) =>
          result.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
        );

      const matchesExperience =
        !filters.experienceType ||
        result.tags
          ?.map((t) => t.toLowerCase())
          .includes(filters.experienceType.toLowerCase());

      const matchesSeasons =
        !filters.seasons ||
        filters.seasons.length === 0 ||
        filters.seasons.some((season) =>
          result.tags
            ?.map((t) => t.toLowerCase())
            .includes(season.toLowerCase())
        );

      const resultDurationHours = this.getHoursFromDuration(result.duration);
      const matchesDuration =
        (!filters.durations?.minHours ||
          resultDurationHours >= filters.durations.minHours) &&
        (!filters.durations?.maxHours ||
          resultDurationHours <= filters.durations.maxHours);

      return (
        matchesDistrict &&
        matchesSearch &&
        matchesTags &&
        matchesExperience &&
        matchesSeasons &&
        matchesDuration
      );
    });

    // Apply sorting after filtering
    if (filters.sort) {
      this.filteredResults = this.sortResults(
        this.filteredResults,
        filters.sort
      );
    }

    return this.filteredResults;
  }

  /**
   * Sorts the destination results based on the selected sort type.
   *
   * @param results - The array of destination data to be sorted.
   * @param sort - The sort type: 'popularity' | 'newest'
   * @returns A new sorted array of destinations.
   */
  sortResults(results: ResultItem[], sort: string): ResultItem[] {
    if (!results || results.length === 0) return [];

    if (sort === 'popularity') {
      // Sort by popularityIndex in descending order (higher popularity comes first)
      return [...results].sort(
        (a, b) => (b.popularityIndex ?? 0) - (a.popularityIndex ?? 0)
      );
    }

    if (sort === 'newest') {
      // Sort by addedOn date in descending order (most recently added first)
      return [...results].sort((a, b) => {
        const dateA = new Date(a.addedOn).getTime();
        const dateB = new Date(b.addedOn).getTime();
        return dateB - dateA;
      });
    }

    // If no valid sort is provided, return the data as-is
    return results;
  }

  getHoursFromDuration(duration: string): number {
    // Check for "days" and convert to hours
    const daysMatch = duration.match(/(\d+)\s*day/);
    if (daysMatch) {
      const days = parseInt(daysMatch[1]);
      return days * 24; // Convert days to hours
    }

    // Check for ranges in hours (e.g., "3-6 hours")
    const hoursMatch = duration.match(/(\d+)\s*-\s*(\d+)\s*hour/);
    if (hoursMatch) {
      const minHours = parseInt(hoursMatch[1]);
      const maxHours = parseInt(hoursMatch[2]);
      return (minHours + maxHours) / 2; // Return the average of the range
    }

    // Check for a specific hour (e.g., "3 hours")
    const singleHourMatch = duration.match(/(\d+)\s*hour/);
    if (singleHourMatch) {
      return parseInt(singleHourMatch[1]); // Return the specified hours
    }

    // If duration is not recognized, return 0 or handle it as needed
    return 0;
  }

  //some constant data here

  getDestinations() {
    return [
      {
        id: 1,
        title: 'Tsomgo Lake & Baba Mandir',
        description:
          "Sacred glacial lake at 12,400ft with Baba Harbhajan Singh's shrine. Protected area permit required.",
        image: 'https://example.com/sikkim/tsomgo-baba.jpg',
        duration: '0-3 hours',
        location: 'Gangtok',
        tags: ['Permit Required', 'High Altitude', 'Buddhist'],
        experienceType: 'Adventure',
        season: 'Winter',
        popularityIndex: 90,
        addedOn: '2025-04-01T10:00:00Z',
      },
      {
        id: 2,
        title: 'Gurudongmar Lake',
        description:
          'One of the world’s highest lakes at 17,800ft, sacred to Buddhists and Sikhs.',
        image: 'https://example.com/sikkim/gurudongmar.jpg',
        duration: '2-3 days',
        location: 'Mangan',
        tags: ['Permit Required', 'Extreme Altitude', 'Pilgrimage'],
        experienceType: 'Spiritual',
        season: 'Spring',
        popularityIndex: 87,
        addedOn: '2025-03-15T09:30:00Z',
      },
      {
        id: 3,
        title: 'Char Dham Complex',
        description:
          'Replica of India’s four holy shrines with 108ft Shiva statue and panoramic views.',
        image: 'https://example.com/sikkim/char-dham.jpg',
        duration: 'Full day',
        location: 'Namchi',
        tags: ['Hindu Pilgrimage', 'Viewpoint', 'Architecture'],
        experienceType: 'Cultural',
        season: 'Summer',
        popularityIndex: 95,
        addedOn: '2025-02-20T11:45:00Z',
      },
      {
        id: 4,
        title: 'Khecheopalri Lake',
        description:
          'Wish-fulfilling lake where leaves never float on the surface, surrounded by forests.',
        image: 'https://example.com/sikkim/khecheopalri.jpg',
        duration: '0-3 hours',
        location: 'Gyalshing',
        tags: ['Sacred Lake', 'Nature', 'Trekking'],
        experienceType: 'Spiritual',
        season: 'Autumn',
        popularityIndex: 80,
        addedOn: '2025-01-10T08:20:00Z',
      },
      {
        id: 5,
        title: 'Pakyong Airport Viewpoint',
        description:
          "Himalaya's first greenfield airport with stunning runway valley views.",
        image: 'https://example.com/sikkim/pakyong-airport.jpg',
        duration: '0-3 hours',
        location: 'Pakyong',
        tags: ['Engineering Marvel', 'Aviation', 'Photography'],
        experienceType: 'Leisure',
        season: 'Monsoon',
        popularityIndex: 76,
        addedOn: '2025-03-05T14:00:00Z',
      },
      {
        id: 6,
        title: 'Soreng Cherry Blossoms',
        description:
          'Annual spring bloom of wild Himalayan cherry trees in Sikkim’s newest district.',
        image: 'https://example.com/sikkim/soreng-cherry.jpg',
        duration: '0-3 hours',
        location: 'Soreng',
        tags: ['Flowers', 'Seasonal', 'Nature'],
        experienceType: 'Nature',
        season: 'Spring',
        popularityIndex: 70,
        addedOn: '2025-04-10T07:50:00Z',
      },
      {
        id: 7,
        title: 'Nathula Pass',
        description:
          'High-altitude pass connecting India with China, offering scenic views of the Himalayan range.',
        image: 'https://example.com/sikkim/nathula-pass.jpg',
        duration: 'Full day',
        location: 'Gangtok',
        tags: ['Historical', 'Adventure', 'Photography'],
        experienceType: 'Adventure',
        season: 'Winter',
        popularityIndex: 92,
        addedOn: '2025-02-01T12:15:00Z',
      },
      {
        id: 8,
        title: 'Mangan Valley',
        description:
          'A peaceful valley known for its lush green landscapes, perfect for trekking and exploration.',
        image: 'https://example.com/sikkim/mangan-valley.jpg',
        duration: '2-3 days',
        location: 'Mangan',
        tags: ['Nature', 'Trekking', 'Adventure'],
        experienceType: 'Nature',
        season: 'Autumn',
        popularityIndex: 84,
        addedOn: '2025-03-25T09:10:00Z',
      },
    ];
  }
}
