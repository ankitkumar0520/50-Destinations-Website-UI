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
        id: 0,
        title: 'Rumtek Monastery',
        description:
          "One of the most important monasteries in Sikkim, showcasing Tibetan architecture and spiritual heritage. Home to the Karmapa's seat outside Tibet.",
        image: 'assets/Images/rumtek-monastry/rumtek2.jpeg',
        duration: '1-3 hours',
        location: 'Gangtok',
        tags: ['Buddhist', 'Spiritual', 'Architecture'],
        experienceType: 'Cultural',
        season: 'All Seasons',
        popularityIndex: 85,
        addedOn: '2025-04-01T10:00:00Z',
      },
      {
        id: 1,
        title: 'Rumtek Monastery',
        description:
          'Rumtek Monastery, also known as the Dharma Chakra Centre, is a prominent Buddhist monastery located near Gangtok in Sikkim, India. Founded in the 16th century by the 9th Karmapa, Wangchuk Dorje, it serves as the main seat in exile of the Karmapa Lama and is renowned for its stunning architecture and serene surroundings. Perched at an elevation of 5,500 feet, the monastery is a vital center for Tibetan Buddhism, housing sacred relics and offering a glimpse into the rich cultural heritage of the region. Visitors are often captivated by its tranquil atmosphere and the breathtaking views of the Himalayas.\n\nThe monastery has a rich history, having been originally established in the mid-18th century under the guidance of the 12th Karmapa, Changchub Dorje. After the 16th Karmapa, Rangjung Rigpe Dorje, fled Tibet in 1959, he chose to rebuild Rumtek, which had fallen into disrepair. The reconstruction was completed in 1966, and the monastery became a significant site for the Karma Kagyu lineage, symbolizing resilience and continuity of Tibetan Buddhism in exile.\n\nToday, Rumtek Monastery is not only a spiritual hub, but also a center of learning, with the Karma Shri Nalanda Institute for Higher Buddhist Studies.',
        image: 'https://example.com/sikkim/rumtek.jpg',
        duration: 'Half day',
        location: 'Gangtok',
        tags: ['Monastery', 'Buddhist', 'Cultural Heritage'],
        experienceType: 'Spiritual',
        season: 'All Seasons',
        popularityIndex: 88,
        addedOn: '2025-04-24T09:00:00Z',
      },
      {
        id: 2,
        title: 'MG Marg, Gangtok',
        description:
          "MG Marg, or Mahatma Gandhi Road, is the vibrant heart of Gangtok, the capital of Sikkim, India. This lively, pedestrian-only boulevard is renowned for its clean, well-maintained environment and charming atmosphere, making it a favorite destination for both locals and tourists. Flanked by colorful shops, cozy cafes, and handicraft stores, MG Marg offers a perfect blend of modern comforts and traditional Sikkimese culture. The street is not just a commercial hub, but also a social and cultural gathering place, where people come together to relax, shop, or simply enjoy the scenic surroundings.\n\nStretching through the center of Gangtok, MG Marg offers stunning views of the surrounding hills and is beautifully lit up in the evenings, creating a warm and inviting ambiance. The road also plays host to various festivals and public events, including the annual Gangtok Food and Culture Festival, which showcases local cuisine, music, and folk performances. Statues of Mahatma Gandhi and other figures add historical depth to the area, while benches and open spaces encourage leisurely strolls and casual conversations.\n\nToday, MG Marg stands as a symbol of Gangtok's modern identity — a place where tradition meets urban elegance. Whether you're exploring local shops, savoring Sikkimese delicacies, or simply enjoying a peaceful evening walk, MG Marg promises an unforgettable experience at the heart of the Himalayas.",
        image: 'https://example.com/sikkim/mg-marg.jpg',
        duration: '0-3 hours',
        location: 'Gangtok',
        tags: ['Shopping', 'Culture', 'Festival'],
        experienceType: 'Cultural',
        season: 'All Seasons',
        popularityIndex: 93,
        addedOn: '2025-04-24T09:30:00Z',
      },
      {
        id: 3,
        title: 'Tsomgo Lake & Baba Mandir',
        description:
          "Sacred glacial lake at 12,400ft with Baba Harbhajan Singh's shrine. Protected area permit required.",
        image: 'assets/Images/destinations/new/bab_mandir.jpg',
        duration: '0-3 hours',
        location: 'Gangtok',
        tags: ['Permit Required', 'High Altitude', 'Buddhist'],
        experienceType: 'Adventure',
        season: 'Winter',
        popularityIndex: 90,
        addedOn: '2025-04-01T10:00:00Z',
      },
      {
        id: 4,
        title: 'Gurudongmar Lake',
        description:
          'One of the world’s highest lakes at 17,800ft, sacred to Buddhists and Sikhs.',
          image: 'assets/Images/destinations/new/char_dhanm.jpg',
        duration: '2-3 days',
        location: 'Mangan',
        tags: ['Permit Required', 'Extreme Altitude', 'Pilgrimage'],
        experienceType: 'Spiritual',
        season: 'Spring',
        popularityIndex: 87,
        addedOn: '2025-03-15T09:30:00Z',
      },
      {
        id: 5,
        title: 'Char Dham Complex',
        description:
          'Replica of India’s four holy shrines with 108ft Shiva statue and panoramic views.',
          image: 'assets/Images/destinations/new/char_dhanm.jpg',
        duration: 'Full day',
        location: 'Namchi',
        tags: ['Hindu Pilgrimage', 'Viewpoint', 'Architecture'],
        experienceType: 'Cultural',
        season: 'Summer',
        popularityIndex: 95,
        addedOn: '2025-02-20T11:45:00Z',
      },
      {
        id: 6,
        title: 'Khecheopalri Lake',
        description:
          'Wish-fulfilling lake where leaves never float on the surface, surrounded by forests.',
          image: 'assets/Images/destinations/new/khecheopalri_lake.jpg',
        duration: '0-3 hours',
        location: 'Gyalshing',
        tags: ['Sacred Lake', 'Nature', 'Trekking'],
        experienceType: 'Spiritual',
        season: 'Autumn',
        popularityIndex: 80,
        addedOn: '2025-01-10T08:20:00Z',
      },
      {
        id: 7,
        title: 'Pakyong Airport Viewpoint',
        description:
          "Himalaya's first greenfield airport with stunning runway valley views.",
          image: 'assets/Images/destinations/new/pakyong_airport.jpg',
        duration: '0-3 hours',
        location: 'Pakyong',
        tags: ['Engineering Marvel', 'Aviation', 'Photography'],
        experienceType: 'Leisure',
        season: 'Monsoon',
        popularityIndex: 76,
        addedOn: '2025-03-05T14:00:00Z',
      },
      {
        id: 8,
        title: 'Soreng Cherry Blossoms',
        description:
          'Annual spring bloom of wild Himalayan cherry trees in Sikkim’s newest district.',
          image: 'assets/Images/destinations/new/char_dhanm.jpg',
        duration: '0-3 hours',
        location: 'Soreng',
        tags: ['Flowers', 'Seasonal', 'Nature'],
        experienceType: 'Nature',
        season: 'Spring',
        popularityIndex: 70,
        addedOn: '2025-04-10T07:50:00Z',
      },
      {
        id: 9,
        title: 'Nathula Pass',
        description:
          'High-altitude pass connecting India with China, offering scenic views of the Himalayan range.',
          image: 'assets/Images/destinations/new/nathula_pass.jpg',
        duration: 'Full day',
        location: 'Gangtok',
        tags: ['Historical', 'Adventure', 'Photography'],
        experienceType: 'Adventure',
        season: 'Winter',
        popularityIndex: 92,
        addedOn: '2025-02-01T12:15:00Z',
      },
      {
        id: 10,
        title: 'Mangan Valley',
        description:
          'A peaceful valley known for its lush green landscapes, perfect for trekking and exploration.',
          image: 'assets/Images/destinations/new/char_dhanm.jpg',
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
