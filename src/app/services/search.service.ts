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
    this.filteredResults = searchResults.filter((result: any) => {
      const matchesDistrict =
        !filters.district ||
        result.districtname?.toLowerCase() === filters.district.toLowerCase();

      const matchesSearch =
        !filters.searchQuery ||
        result.destinationname
          ?.toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        result.destinationdescription
          ?.toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

      const matchesTags =
        !filters.tags ||
        filters.tags.length === 0 ||
        filters.tags.some((tag: any) =>
          result.tags?.map((t: any) => t.toLowerCase()).includes(tag.toLowerCase())
        );

      const matchesExperience =
        !filters.experienceType ||
        result.tags
          ?.map((t: any) => t.toLowerCase())
          .includes(filters.experienceType.toLowerCase());

      const matchesSeasons =
        !filters.seasons ||
        filters.seasons.length === 0 ||
        filters.seasons.some((season) =>
          result.tags
            ?.map((t: any) => t.toLowerCase())
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
  sortResults(results: any[], sort: string): any[] {
    if (!results || results.length === 0) return [];

    if (sort === 'popularity') {
      // Sort by popularityIndex in descending order (higher popularity comes first)
      return [...results].sort(
        (a, b) => (b.popularityCount ?? 0) - (a.popularityCount ?? 0)
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
        slug: 'rumtek-monastery',
        destinationname: 'Rumtek Monastery',
        destinationdescription:
          "One of the most important monasteries in Sikkim, showcasing Tibetan architecture and spiritual heritage. Home to the Karmapa's seat outside Tibet.",
        image: 'assets/Images/rumtek-monastry/rumtek2.jpeg',
        duration: '1-3 hours',
        districtname: 'Gangtok',
        tags: ['Buddhist', 'Spiritual', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 85,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-04-01T10:00:00Z',
      },
     
      {
        slug: 'mg-marg-gangtok',
        destinationname: 'MG Marg, Gangtok',
        destinationdescription:
          "MG Marg, or Mahatma Gandhi Road, is the vibrant heart of Gangtok, the capital of Sikkim, India. This lively, pedestrian-only boulevard is renowned for its clean, well-maintained environment and charming atmosphere, making it a favorite destination for both locals and tourists. Flanked by colorful shops, cozy cafes, and handicraft stores, MG Marg offers a perfect blend of modern comforts and traditional Sikkimese culture. The street is not just a commercial hub, but also a social and cultural gathering place, where people come together to relax, shop, or simply enjoy the scenic surroundings.\n\nStretching through the center of Gangtok, MG Marg offers stunning views of the surrounding hills and is beautifully lit up in the evenings, creating a warm and inviting ambiance. The road also plays host to various festivals and public events, including the annual Gangtok Food and Culture Festival, which showcases local cuisine, music, and folk performances. Statues of Mahatma Gandhi and other figures add historical depth to the area, while benches and open spaces encourage leisurely strolls and casual conversations.\n\nToday, MG Marg stands as a symbol of Gangtok's modern identity — a place where tradition meets urban elegance. Whether you're exploring local shops, savoring Sikkimese delicacies, or simply enjoying a peaceful evening walk, MG Marg promises an unforgettable experience at the heart of the Himalayas.",
          image: 'assets/Images/destinations/new/mg-marg.jpg',
        duration: '0-3 hours',
        districtname: 'Gangtok',
        tags: ['Shopping', 'Culture', 'Festival'],
        destinationtypename: 'Cultural',
        popularityCount: 93,
        seasons: ['Spring', 'Autumn'],  
        addedOn: '2025-04-24T09:30:00Z',
      },
      {
        slug: 'tsomgo-lake-baba-mandir',
        destinationname: 'Tsomgo Lake & Baba Mandir',
        destinationdescription:
          "Sacred glacial lake at 12,400ft with Baba Harbhajan Singh's shrine. Protected area permit required.",
        image: 'assets/Images/destinations/new/bab_mandir.jpg',
        duration: '0-3 hours',
        districtname: 'Gangtok',
        tags: ['Permit Required', 'High Altitude', 'Buddhist'],
        destinationtypename: 'Adventure',
        popularityCount: 90,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-04-01T10:00:00Z',
      },
      {
        slug: 'gurudongmar-lake',
        destinationname: 'Gurudongmar Lake',
        destinationdescription:
          'One of the world’s highest lakes at 17,800ft, sacred to Buddhists and Sikhs.',
          image: 'assets/Images/destinations/new/gurudongmar_lake.jpg',
        duration: '2-3 days',
        districtname: 'Mangan',
        tags: ['Permit Required', 'Extreme Altitude', 'Pilgrimage'],
        destinationtypename: 'Spiritual',
        popularityCount: 87,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-03-15T09:30:00Z',
      },
      {
        slug: 'char-dham-complex',
        destinationname: 'Char Dham Complex',
        destinationdescription:
          'Replica of India’s four holy shrines with 108ft Shiva statue and panoramic views.',
          image: 'assets/Images/destinations/new/char_dhanm.jpg',
        duration: 'Full day',
        districtname: 'Namchi',
        tags: ['Hindu Pilgrimage', 'Viewpoint', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 95,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-02-20T11:45:00Z',
      },
      {
        slug: 'khecheopalri-lake',
        destinationname: 'Khecheopalri Lake',
        destinationdescription:
          'Wish-fulfilling lake where leaves never float on the surface, surrounded by forests.',
          image: 'assets/Images/destinations/new/khecheopalri_lake.jpg',
        duration: '0-3 hours',
        districtname: 'Gyalshing',
        tags: ['Sacred Lake', 'Nature', 'Trekking'],
        destinationtypename: 'Spiritual',
        popularityCount: 80,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-01-10T08:20:00Z',
      },
      {
        slug: 'pakyong-airport-viewpoint',
        destinationname: 'Pakyong Airport Viewpoint',
        destinationdescription:
          "Himalaya's first greenfield airport with stunning runway valley views.",
          image: 'assets/Images/destinations/new/pakyong_airport.jpg',
        duration: '0-3 hours',
        districtname: 'Pakyong',
        tags: ['Engineering Marvel', 'Aviation', 'Photography'],
        destinationtypename: 'Leisure',
        popularityCount: 76,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-03-05T14:00:00Z',
      },
      {
        slug: 'soreng-cherry-blossoms',
        destinationname: 'Soreng Cherry Blossoms',
        destinationdescription:
          'Annual spring bloom of wild Himalayan cherry trees in Sikkim’s newest district.',
          image: 'assets/Images/destinations/new/cherry_blosom.jpg',
        duration: '0-3 hours',
          districtname: 'Soreng',
        tags: ['Flowers', 'Seasonal', 'Nature'],
        destinationtypename: 'Nature',
        popularityCount: 70,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-04-10T07:50:00Z',
      },
      {
        slug: 'nathula-pass',
        destinationname: 'Nathula Pass',
        destinationdescription:
          'High-altitude pass connecting India with China, offering scenic views of the Himalayan range.',
          image: 'assets/Images/destinations/new/nathula_pass.jpg',
        duration: 'Full day',
        districtname: 'Gangtok',
        tags: ['Historical', 'Adventure', 'Photography'],
        destinationtypename: 'Adventure',
        popularityCount: 92,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-02-01T12:15:00Z',
      },
      {
        slug: 'mangan-valley',
        destinationname: 'Mangan Valley',
        destinationdescription:
          'A peaceful valley known for its lush green landscapes, perfect for trekking and exploration.',
          image: 'assets/Images/destinations/new/mangan.jpg',
        duration: '2-3 days',
        districtname: 'Mangan',
        tags: ['Nature', 'Trekking', 'Adventure'],
        destinationtypename: 'Nature',
        popularityCount: 84,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-03-25T09:10:00Z',
      },
    ];
  }
  
}
