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

  // getDestinations() {
  //   return [
  //     {
  //       slug: 'rumtek-monastery',
  //       destinationname: 'Rumtek Monastery',
  //       destinationdescription:
  //         "One of the most important monasteries in Sikkim, showcasing Tibetan architecture and spiritual heritage. Home to the Karmapa's seat outside Tibet.",
  //       image: 'assets/Images/rumtek-monastry/rumtek2.jpeg',
  //       duration: '1-3 hours',
  //       districtname: 'Gangtok',
  //       tags: ['Buddhist', 'Spiritual', 'Architecture'],
  //       destinationtypename: 'Cultural',
  //       popularityCount: 85,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-04-01T10:00:00Z',
  //     },
     
  //     {
  //       slug: 'mg-marg-gangtok',
  //       destinationname: 'MG Marg, Gangtok',
  //       destinationdescription:
  //         "MG Marg, or Mahatma Gandhi Road, is the vibrant heart of Gangtok, the capital of Sikkim, India. This lively, pedestrian-only boulevard is renowned for its clean, well-maintained environment and charming atmosphere, making it a favorite destination for both locals and tourists. Flanked by colorful shops, cozy cafes, and handicraft stores, MG Marg offers a perfect blend of modern comforts and traditional Sikkimese culture. The street is not just a commercial hub, but also a social and cultural gathering place, where people come together to relax, shop, or simply enjoy the scenic surroundings.\n\nStretching through the center of Gangtok, MG Marg offers stunning views of the surrounding hills and is beautifully lit up in the evenings, creating a warm and inviting ambiance. The road also plays host to various festivals and public events, including the annual Gangtok Food and Culture Festival, which showcases local cuisine, music, and folk performances. Statues of Mahatma Gandhi and other figures add historical depth to the area, while benches and open spaces encourage leisurely strolls and casual conversations.\n\nToday, MG Marg stands as a symbol of Gangtok's modern identity — a place where tradition meets urban elegance. Whether you're exploring local shops, savoring Sikkimese delicacies, or simply enjoying a peaceful evening walk, MG Marg promises an unforgettable experience at the heart of the Himalayas.",
  //         image: 'assets/Images/destinations/new/mg-marg.jpg',
  //       duration: '0-3 hours',
  //       districtname: 'Gangtok',
  //       tags: ['Shopping', 'Culture', 'Festival'],
  //       destinationtypename: 'Cultural',
  //       popularityCount: 93,
  //       seasons: ['Spring', 'Autumn'],  
  //       addedOn: '2025-04-24T09:30:00Z',
  //     },
  //     {
  //       slug: 'tsomgo-lake-baba-mandir',
  //       destinationname: 'Tsomgo Lake & Baba Mandir',
  //       destinationdescription:
  //         "Sacred glacial lake at 12,400ft with Baba Harbhajan Singh's shrine. Protected area permit required.",
  //       image: 'assets/Images/destinations/new/bab_mandir.jpg',
  //       duration: '0-3 hours',
  //       districtname: 'Gangtok',
  //       tags: ['Permit Required', 'High Altitude', 'Buddhist'],
  //       destinationtypename: 'Adventure',
  //       popularityCount: 90,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-04-01T10:00:00Z',
  //     },
  //     {
  //       slug: 'gurudongmar-lake',
  //       destinationname: 'Gurudongmar Lake',
  //       destinationdescription:
  //         'One of the world’s highest lakes at 17,800ft, sacred to Buddhists and Sikhs.',
  //         image: 'assets/Images/destinations/new/gurudongmar_lake.jpg',
  //       duration: '2-3 days',
  //       districtname: 'Mangan',
  //       tags: ['Permit Required', 'Extreme Altitude', 'Pilgrimage'],
  //       destinationtypename: 'Spiritual',
  //       popularityCount: 87,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-03-15T09:30:00Z',
  //     },
  //     {
  //       slug: 'char-dham-complex',
  //       destinationname: 'Char Dham Complex',
  //       destinationdescription:
  //         'Replica of India’s four holy shrines with 108ft Shiva statue and panoramic views.',
  //         image: 'assets/Images/destinations/new/char_dhanm.jpg',
  //       duration: 'Full day',
  //       districtname: 'Namchi',
  //       tags: ['Hindu Pilgrimage', 'Viewpoint', 'Architecture'],
  //       destinationtypename: 'Cultural',
  //       popularityCount: 95,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-02-20T11:45:00Z',
  //     },
  //     {
  //       slug: 'khecheopalri-lake',
  //       destinationname: 'Khecheopalri Lake',
  //       destinationdescription:
  //         'Wish-fulfilling lake where leaves never float on the surface, surrounded by forests.',
  //         image: 'assets/Images/destinations/new/khecheopalri_lake.jpg',
  //       duration: '0-3 hours',
  //       districtname: 'Gyalshing',
  //       tags: ['Sacred Lake', 'Nature', 'Trekking'],
  //       destinationtypename: 'Spiritual',
  //       popularityCount: 80,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-01-10T08:20:00Z',
  //     },
  //     {
  //       slug: 'pakyong-airport-viewpoint',
  //       destinationname: 'Pakyong Airport Viewpoint',
  //       destinationdescription:
  //         "Himalaya's first greenfield airport with stunning runway valley views.",
  //         image: 'assets/Images/destinations/new/pakyong_airport.jpg',
  //       duration: '0-3 hours',
  //       districtname: 'Pakyong',
  //       tags: ['Engineering Marvel', 'Aviation', 'Photography'],
  //       destinationtypename: 'Leisure',
  //       popularityCount: 76,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-03-05T14:00:00Z',
  //     },
  //     {
  //       slug: 'soreng-cherry-blossoms',
  //       destinationname: 'Soreng Cherry Blossoms',
  //       destinationdescription:
  //         'Annual spring bloom of wild Himalayan cherry trees in Sikkim’s newest district.',
  //         image: 'assets/Images/destinations/new/cherry_blosom.jpg',
  //       duration: '0-3 hours',
  //         districtname: 'Soreng',
  //       tags: ['Flowers', 'Seasonal', 'Nature'],
  //       destinationtypename: 'Nature',
  //       popularityCount: 70,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-04-10T07:50:00Z',
  //     },
  //     {
  //       slug: 'nathula-pass',
  //       destinationname: 'Nathula Pass',
  //       destinationdescription:
  //         'High-altitude pass connecting India with China, offering scenic views of the Himalayan range.',
  //         image: 'assets/Images/destinations/new/nathula_pass.jpg',
  //       duration: 'Full day',
  //       districtname: 'Gangtok',
  //       tags: ['Historical', 'Adventure', 'Photography'],
  //       destinationtypename: 'Adventure',
  //       popularityCount: 92,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-02-01T12:15:00Z',
  //     },
  //     {
  //       slug: 'mangan-valley',
  //       destinationname: 'Mangan Valley',
  //       destinationdescription:
  //         'A peaceful valley known for its lush green landscapes, perfect for trekking and exploration.',
  //         image: 'assets/Images/destinations/new/mangan.jpg',
  //       duration: '2-3 days',
  //       districtname: 'Mangan',
  //       tags: ['Nature', 'Trekking', 'Adventure'],
  //       destinationtypename: 'Nature',
  //       popularityCount: 84,
  //       seasons: ['Spring', 'Autumn'],
  //       addedOn: '2025-03-25T09:10:00Z',
  //     },
  //   ];
  // }

  getDestinations() {
    return [
      // 1-10
      {
        slug: 'mg-marg',
        destinationname: 'M.G Marg',
        destinationdescription: 'The vibrant pedestrian-only shopping street and cultural hub of Gangtok.',
        image: 'assets/Images/destinations/mg-marg.jpg',
        duration: '2-3 hours',
        districtname: 'Gangtok',
        tags: ['Shopping', 'Food', 'Cultural'],
        destinationtypename: 'Urban',
        popularityCount: 95,
        seasons: ['All'],
        addedOn: '2025-01-15T09:00:00Z'
      },
      {
        slug: 'varsey-rhododendron',
        destinationname: 'Varsey Rhododendron Sanctuary',
        destinationdescription: 'Beautiful sanctuary known for its vibrant rhododendron blooms during spring.',
        image: 'assets/Images/destinations/varsey-rhododendron.jpg',
        duration: '4-6 hours',
        districtname: 'Gyalshing',
        tags: ['Flowers', 'Nature', 'Trekking'],
        destinationtypename: 'Nature',
        popularityCount: 82,
        seasons: ['Spring'],
        addedOn: '2025-02-10T08:30:00Z'
      },
      {
        slug: 'yumthang-valley',
        destinationname: 'Yumthang Valley',
        destinationdescription: 'Known as the "Valley of Flowers" with hot springs and stunning Himalayan views.',
        image: 'assets/Images/destinations/yumthang-valley.jpg',
        duration: 'Full day',
        districtname: 'Mangan',
        tags: ['Flowers', 'Hot Springs', 'Scenic'],
        destinationtypename: 'Nature',
        popularityCount: 90,
        seasons: ['Spring', 'Summer'],
        addedOn: '2025-01-20T10:15:00Z'
      },
      {
        slug: 'zuluk',
        destinationname: 'Zuluk',
        destinationdescription: 'Historic Silk Route village with dramatic hairpin bends and mountain views.',
        image: 'assets/Images/destinations/zuluk.jpg',
        duration: 'Full day',
        districtname: 'Pakyong',
        tags: ['Historical', 'Scenic Drive', 'Offbeat'],
        destinationtypename: 'Adventure',
        popularityCount: 85,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-02-05T11:45:00Z'
      },
      {
        slug: 'yangtey-town',
        destinationname: 'Yangtey Town',
        destinationdescription: 'Quaint village on the Silk Route with panoramic Himalayan vistas.',
        image: 'assets/Images/destinations/yangtey-town.jpg',
        duration: '2-3 hours',
        districtname: 'Pakyong',
        tags: ['Village', 'Scenic', 'Historical'],
        destinationtypename: 'Cultural',
        popularityCount: 75,
        seasons: ['All'],
        addedOn: '2025-03-10T14:20:00Z'
      },
      {
        slug: 'lachung',
        destinationname: 'Lachung',
        destinationdescription: 'Picturesque mountain village and gateway to Yumthang Valley.',
        image: 'assets/Images/destinations/lachung.jpg',
        duration: '2-3 days',
        districtname: 'Mangan',
        tags: ['Village', 'Base Camp', 'Scenic'],
        destinationtypename: 'Nature',
        popularityCount: 88,
        seasons: ['Spring', 'Summer'],
        addedOn: '2025-01-25T09:30:00Z'
      },
      {
        slug: 'tsomgo-lake',
        destinationname: 'Tsomgo Lake',
        destinationdescription: 'Sacred high-altitude glacial lake with stunning turquoise waters.',
        image: 'assets/Images/destinations/tsomgo-lake.jpg',
        duration: '4-5 hours',
        districtname: 'Gangtok',
        tags: ['Lake', 'High Altitude', 'Sacred'],
        destinationtypename: 'Nature',
        popularityCount: 92,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-02-15T10:00:00Z'
      },
      {
        slug: 'khecheopalri-lake',
        destinationname: 'Khecheopalri Lake',
        destinationdescription: 'Wish-fulfilling sacred lake where leaves never float on the surface.',
        image: 'assets/Images/destinations/khecheopalri-lake.jpg',
        duration: '2-3 hours',
        districtname: 'Gyalshing',
        tags: ['Sacred', 'Lake', 'Spiritual'],
        destinationtypename: 'Spiritual',
        popularityCount: 84,
        seasons: ['All'],
        addedOn: '2025-03-05T13:15:00Z'
      },
      {
        slug: 'lachen',
        destinationname: 'Lachen',
        destinationdescription: 'Base village for Gurudongmar Lake with traditional Sikkimese culture.',
        image: 'assets/Images/destinations/lachen.jpg',
        duration: '2-3 days',
        districtname: 'Mangan',
        tags: ['Village', 'Base Camp', 'Cultural'],
        destinationtypename: 'Cultural',
        popularityCount: 80,
        seasons: ['Spring', 'Summer'],
        addedOn: '2025-04-01T11:30:00Z'
      },
      {
        slug: 'nathula-pass',
        destinationname: 'Nathula Pass',
        destinationdescription: 'Historic mountain pass on the India-China border at 14,140 ft.',
        image: 'assets/Images/destinations/nathula-pass.jpg',
        duration: 'Full day',
        districtname: 'Gangtok',
        tags: ['Border', 'High Altitude', 'Historical'],
        destinationtypename: 'Adventure',
        popularityCount: 89,
        seasons: ['Summer'],
        addedOn: '2025-02-20T08:45:00Z'
      },
  
      // 11-20
      {
        slug: 'pelling-skywalk',
        destinationname: 'Pelling Skywalk',
        destinationdescription: 'Glass skywalk offering breathtaking views of the Kanchenjunga range.',
        image: 'assets/Images/destinations/pelling-skywalk.jpg',
        duration: '1-2 hours',
        districtname: 'Gyalshing',
        tags: ['Adventure', 'Viewpoint', 'Photography'],
        destinationtypename: 'Adventure',
        popularityCount: 88,
        seasons: ['All'],
        addedOn: '2025-03-05T11:20:00Z'
      },
      {
        slug: 'labrang-monastery',
        destinationname: 'Labrang Monastery',
        destinationdescription: 'Important Buddhist monastery in Mangan with traditional architecture.',
        image: 'assets/Images/destinations/labrang-monastery.jpg',
        duration: '1-2 hours',
        districtname: 'Mangan',
        tags: ['Buddhist', 'Spiritual', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 75,
        seasons: ['All'],
        addedOn: '2025-02-18T14:00:00Z'
      },
      {
        slug: 'ropeway-deorali',
        destinationname: 'Ropeway (Deorali)',
        destinationdescription: 'Cable car offering panoramic views of Gangtok and surrounding mountains.',
        image: 'assets/Images/destinations/ropeway-deorali.jpg',
        duration: '1 hour',
        districtname: 'Gangtok',
        tags: ['Viewpoint', 'Adventure', 'Urban'],
        destinationtypename: 'Urban',
        popularityCount: 83,
        seasons: ['All'],
        addedOn: '2025-01-30T10:30:00Z'
      },
      {
        slug: 'pemayangtse-monastery',
        destinationname: 'Pemayangtse Monastery',
        destinationdescription: 'One of Sikkim\'s oldest monasteries with intricate wood carvings.',
        image: 'assets/Images/destinations/pemayangtse-monastery.jpg',
        duration: '1-2 hours',
        districtname: 'Gyalshing',
        tags: ['Buddhist', 'Historical', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 81,
        seasons: ['All'],
        addedOn: '2025-03-12T09:15:00Z'
      },
      {
        slug: 'tholung-monastery',
        destinationname: 'Tholung Monastery',
        destinationdescription: 'Remote monastery in North Sikkim with ancient religious artifacts.',
        image: 'assets/Images/destinations/tholung-monastery.jpg',
        duration: '3-4 hours',
        districtname: 'Mangan',
        tags: ['Buddhist', 'Historical', 'Offbeat'],
        destinationtypename: 'Cultural',
        popularityCount: 68,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-04-05T13:00:00Z'
      },
      {
        slug: 'rumtek-monastery',
        destinationname: 'Rumtek Monastery',
        destinationdescription: 'One of Sikkim\'s most important monasteries, seat of the Karmapa.',
        image: 'assets/Images/destinations/rumtek-monastery.jpg',
        duration: '2-3 hours',
        districtname: 'Gangtok',
        tags: ['Buddhist', 'Spiritual', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 87,
        seasons: ['All'],
        addedOn: '2025-02-10T11:00:00Z'
      },
      {
        slug: 'rabdentse-ruins',
        destinationname: 'Rabdentse Ruins',
        destinationdescription: 'Ancient capital of Sikkim with ruins offering panoramic mountain views.',
        image: 'assets/Images/destinations/rabdentse-ruins.jpg',
        duration: '1-2 hours',
        districtname: 'Gyalshing',
        tags: ['Historical', 'Ruins', 'Viewpoint'],
        destinationtypename: 'Historical',
        popularityCount: 79,
        seasons: ['All'],
        addedOn: '2025-03-15T10:45:00Z'
      },
      {
        slug: 'seven-sister-waterfalls',
        destinationname: 'Seven Sister Waterfalls',
        destinationdescription: 'Spectacular seven-tiered waterfall surrounded by lush greenery.',
        image: 'assets/Images/destinations/seven-sister-waterfalls.jpg',
        duration: '1 hour',
        districtname: 'Gangtok',
        tags: ['Waterfall', 'Nature', 'Scenic'],
        destinationtypename: 'Nature',
        popularityCount: 84,
        seasons: ['Monsoon', 'Autumn'],
        addedOn: '2025-01-22T14:30:00Z'
      },
      {
        slug: 'ban-jhakri-falls',
        destinationname: 'Ban Jhakri Falls',
        destinationdescription: 'Beautiful waterfall with an adjacent energy park showcasing Sikkimese folklore.',
        image: 'assets/Images/destinations/ban-jhakri-falls.jpg',
        duration: '1-2 hours',
        districtname: 'Gangtok',
        tags: ['Waterfall', 'Cultural', 'Park'],
        destinationtypename: 'Nature',
        popularityCount: 76,
        seasons: ['All'],
        addedOn: '2025-02-28T12:15:00Z'
      },
      {
        slug: 'dzongri-trek',
        destinationname: 'Dzongri Trek',
        destinationdescription: 'Popular trekking route offering spectacular views of Kanchenjunga.',
        image: 'assets/Images/destinations/dzongri-trek.jpg',
        duration: '5-7 days',
        districtname: 'Gyalshing',
        tags: ['Trekking', 'Adventure', 'Nature'],
        destinationtypename: 'Adventure',
        popularityCount: 85,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-03-12T09:45:00Z'
      },
  
      // 21-30
      {
        slug: 'dzongu',
        destinationname: 'Dzongu',
        destinationdescription: 'Protected area of the Lepcha tribe with pristine forests and rivers.',
        image: 'assets/Images/destinations/dzongu.jpg',
        duration: '2-3 days',
        districtname: 'Mangan',
        tags: ['Tribal', 'Nature', 'Offbeat'],
        destinationtypename: 'Cultural',
        popularityCount: 72,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-04-10T10:00:00Z'
      },
      {
        slug: 'paragliding-ranka',
        destinationname: 'Paragliding (Ranka)',
        destinationdescription: 'Thrilling paragliding experience with views of Gangtok and mountains.',
        image: 'assets/Images/destinations/paragliding-ranka.jpg',
        duration: '2-3 hours',
        districtname: 'Gangtok',
        tags: ['Adventure', 'Extreme Sports', 'Viewpoint'],
        destinationtypename: 'Adventure',
        popularityCount: 89,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-02-25T13:45:00Z'
      },
      {
        slug: 'coronation-throne',
        destinationname: 'Coronation Throne of Norbugang',
        destinationdescription: 'Historic site where Sikkim\'s first king was crowned in 1642.',
        image: 'assets/Images/destinations/coronation-throne.jpg',
        duration: '1 hour',
        districtname: 'Gyalshing',
        tags: ['Historical', 'Monarchy', 'Cultural'],
        destinationtypename: 'Historical',
        popularityCount: 74,
        seasons: ['All'],
        addedOn: '2025-03-20T11:30:00Z'
      },
      {
        slug: 'chungthang',
        destinationname: 'Chungthang',
        destinationdescription: 'Confluence of Lachen and Lachung rivers, considered sacred.',
        image: 'assets/Images/destinations/chungthang.jpg',
        duration: '1-2 hours',
        districtname: 'Mangan',
        tags: ['Sacred', 'Confluence', 'Village'],
        destinationtypename: 'Spiritual',
        popularityCount: 71,
        seasons: ['All'],
        addedOn: '2025-04-15T09:00:00Z'
      },
      {
        slug: 'tashi-view-point',
        destinationname: 'Tashi View Point',
        destinationdescription: 'Popular viewpoint for sunrise views of Kanchenjunga range.',
        image: 'assets/Images/destinations/tashi-view-point.jpg',
        duration: '1 hour',
        districtname: 'Gangtok',
        tags: ['Viewpoint', 'Sunrise', 'Photography'],
        destinationtypename: 'Nature',
        popularityCount: 86,
        seasons: ['All'],
        addedOn: '2025-01-28T07:30:00Z'
      },
      {
        slug: 'kirateshwar-mahadev',
        destinationname: 'Kirateshwar Mahadev Temple',
        destinationdescription: 'Ancient Shiva temple mentioned in the Mahabharata epic.',
        image: 'assets/Images/destinations/kirateshwar-mahadev.jpg',
        duration: '1-2 hours',
        districtname: 'Gangtok',
        tags: ['Hindu', 'Temple', 'Historical'],
        destinationtypename: 'Spiritual',
        popularityCount: 78,
        seasons: ['All'],
        addedOn: '2025-02-22T12:00:00Z'
      },
      {
        slug: 'kabi-lungchok',
        destinationname: 'Kabi Lungchok',
        destinationdescription: 'Historic site of the blood brotherhood treaty between Lepchas and Bhutias.',
        image: 'assets/Images/destinations/kabi-lungchok.jpg',
        duration: '1 hour',
        districtname: 'Gangtok',
        tags: ['Historical', 'Monument', 'Cultural'],
        destinationtypename: 'Historical',
        popularityCount: 69,
        seasons: ['All'],
        addedOn: '2025-03-25T10:15:00Z'
      },
      {
        slug: 'ranka-monastery',
        destinationname: 'Ranka Monastery',
        destinationdescription: 'Beautiful monastery near Gangtok with colorful prayer flags and peaceful ambiance.',
        image: 'assets/Images/destinations/ranka-monastery.jpg',
        duration: '1-2 hours',
        districtname: 'Gangtok',
        tags: ['Buddhist', 'Peaceful', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 77,
        seasons: ['All'],
        addedOn: '2025-04-08T14:00:00Z'
      },
      {
        slug: 'singalila-uttarey',
        destinationname: 'Singalila Uttarey Round Trek',
        destinationdescription: 'Scenic trek through rhododendron forests with mountain views.',
        image: 'assets/Images/destinations/singalila-uttarey.jpg',
        duration: '3-4 days',
        districtname: 'Gyalshing',
        tags: ['Trekking', 'Nature', 'Flowers'],
        destinationtypename: 'Adventure',
        popularityCount: 83,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-02-14T09:30:00Z'
      },
      {
        slug: 'shingba-rhododendron',
        destinationname: 'Shingba Rhododendron Sanctuary',
        destinationdescription: 'Sanctuary with over 40 species of rhododendrons blooming in spring.',
        image: 'assets/Images/destinations/shingba-rhododendron.jpg',
        duration: '4-5 hours',
        districtname: 'Mangan',
        tags: ['Flowers', 'Nature', 'Wildlife'],
        destinationtypename: 'Nature',
        popularityCount: 80,
        seasons: ['Spring'],
        addedOn: '2025-03-08T13:15:00Z'
      },
  
      // 31-40
      {
        slug: 'enchey-monastery',
        destinationname: 'Enchey Monastery',
        destinationdescription: '200-year-old monastery in Gangtok with beautiful murals and sculptures.',
        image: 'assets/Images/destinations/enchey-monastery.jpg',
        duration: '1 hour',
        districtname: 'Gangtok',
        tags: ['Buddhist', 'Historical', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 80,
        seasons: ['All'],
        addedOn: '2025-01-25T13:30:00Z'
      },
      {
        slug: 'okhrey',
        destinationname: 'Okhrey',
        destinationdescription: 'Quaint village known for its cardamom plantations and trekking routes.',
        image: 'assets/Images/destinations/okhrey.jpg',
        duration: '2-3 hours',
        districtname: 'Gyalshing',
        tags: ['Village', 'Plantations', 'Trekking'],
        destinationtypename: 'Nature',
        popularityCount: 73,
        seasons: ['All'],
        addedOn: '2025-02-17T11:45:00Z'
      },
      {
        slug: 'chopta-valley',
        destinationname: 'Chopta Valley',
        destinationdescription: 'Unexplored valley with pristine nature and panoramic mountain views.',
        image: 'assets/Images/destinations/chopta-valley.jpg',
        duration: 'Full day',
        districtname: 'Mangan',
        tags: ['Offbeat', 'Nature', 'Scenic'],
        destinationtypename: 'Nature',
        popularityCount: 70,
        seasons: ['Spring', 'Autumn'],
        addedOn: '2025-03-22T10:30:00Z'
      },
      {
        slug: 'nathang-valley',
        destinationname: 'Nathang Valley',
        destinationdescription: 'High-altitude valley on the Old Silk Route with breathtaking landscapes.',
        image: 'assets/Images/destinations/nathang-valley.jpg',
        duration: 'Full day',
        districtname: 'Pakyong',
        tags: ['Scenic', 'Historical', 'Offbeat'],
        destinationtypename: 'Nature',
        popularityCount: 79,
        seasons: ['Spring', 'Summer'],
        addedOn: '2025-04-12T09:15:00Z'
      },
      {
        slug: 'khangchendzonga-waterfalls',
        destinationname: 'Khangchendzonga Waterfalls',
        destinationdescription: 'Majestic waterfall named after Sikkim\'s guardian deity.',
        image: 'assets/Images/destinations/khangchendzonga-waterfalls.jpg',
        duration: '1-2 hours',
        districtname: 'Gangtok',
        tags: ['Waterfall', 'Sacred', 'Nature'],
        destinationtypename: 'Nature',
        popularityCount: 82,
        seasons: ['Monsoon', 'Autumn'],
        addedOn: '2025-01-18T14:45:00Z'
      },
      {
        slug: 'gurudongmar-lake',
        destinationname: 'Gurudongmar Lake',
        destinationdescription: 'One of the world\'s highest lakes at 17,800ft, sacred to Buddhists and Sikhs.',
        image: 'assets/Images/destinations/gurudongmar-lake.jpg',
        duration: '2-3 days',
        districtname: 'Mangan',
        tags: ['Lake', 'High Altitude', 'Sacred'],
        destinationtypename: 'Spiritual',
        popularityCount: 91,
        seasons: ['Summer'],
        addedOn: '2025-02-08T08:00:00Z'
      },
      {
        slug: 'bakthang-falls',
        destinationname: 'Bakthang Falls',
        destinationdescription: 'Beautiful waterfall near Gangtok surrounded by lush greenery.',
        image: 'assets/Images/destinations/bakthang-falls.jpg',
        duration: '1-2 hours',
        districtname: 'Gangtok',
        tags: ['Waterfall', 'Nature', 'Picnic'],
        destinationtypename: 'Nature',
        popularityCount: 75,
        seasons: ['All'],
        addedOn: '2025-03-15T12:30:00Z'
      },
      {
        slug: 'singshore-bridge',
        destinationname: 'Singshore Bridge',
        destinationdescription: 'Sikkim\'s highest bridge with stunning gorge views.',
        image: 'assets/Images/destinations/singshore-bridge.jpg',
        duration: '1 hour',
        districtname: 'Gyalshing',
        tags: ['Bridge', 'Viewpoint', 'Engineering'],
        destinationtypename: 'Adventure',
        popularityCount: 84,
        seasons: ['All'],
        addedOn: '2025-04-05T11:00:00Z'
      },
      {
        slug: 'phodong-monastery',
        destinationname: 'Phodong Monastery',
        destinationdescription: 'Important monastery of the Kagyupa sect with beautiful murals.',
        image: 'assets/Images/destinations/phodong-monastery.jpg',
        duration: '1-2 hours',
        districtname: 'Mangan',
        tags: ['Buddhist', 'Art', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 76,
        seasons: ['All'],
        addedOn: '2025-01-30T13:15:00Z'
      },
      {
        slug: 'kupup',
        destinationname: 'Kupup',
        destinationdescription: 'Remote village near the China border with stunning Himalayan views.',
        image: 'assets/Images/destinations/kupup.jpg',
        duration: 'Full day',
        districtname: 'Pakyong',
        tags: ['Border', 'Remote', 'Scenic'],
        destinationtypename: 'Adventure',
        popularityCount: 72,
        seasons: ['Summer'],
        addedOn: '2025-02-20T10:45:00Z'
      },
  
      // 41-50
      {
        slug: 'biksthang',
        destinationname: 'Biksthang',
        destinationdescription: 'Quiet village with panoramic views of Kanchenjunga and tea gardens.',
        image: 'assets/Images/destinations/biksthang.jpg',
        duration: '2-3 hours',
        districtname: 'Gyalshing',
        tags: ['Scenic', 'Village', 'Tea Gardens'],
        destinationtypename: 'Nature',
        popularityCount: 70,
        seasons: ['All'],
        addedOn: '2025-04-05T10:00:00Z'
      },
      {
        slug: 'thangu-valley',
        destinationname: 'Thangu Valley',
        destinationdescription: 'High-altitude valley with nomadic settlements and alpine flowers.',
        image: 'assets/Images/destinations/thangu-valley.jpg',
        duration: '2-3 days',
        districtname: 'Mangan',
        tags: ['High Altitude', 'Nomadic', 'Flowers'],
        destinationtypename: 'Nature',
        popularityCount: 74,
        seasons: ['Summer'],
        addedOn: '2025-03-10T12:30:00Z'
      },
      {
        slug: 'namgyal-institute',
        destinationname: 'Namgyal Institute of Tibetology',
        destinationdescription: 'Premier center for Tibetan studies with museum of Buddhist artifacts.',
        image: 'assets/Images/destinations/namgyal-institute.jpg',
        duration: '1-2 hours',
        districtname: 'Gangtok',
        tags: ['Museum', 'Buddhist', 'Education'],
        destinationtypename: 'Cultural',
        popularityCount: 78,
        seasons: ['All'],
        addedOn: '2025-02-15T14:15:00Z'
      },
      {
        slug: 'chayatal',
        destinationname: 'Chayatal',
        destinationdescription: 'Serene lake surrounded by forests, perfect for nature lovers.',
        image: 'assets/Images/destinations/chayatal.jpg',
        duration: '2-3 hours',
        districtname: 'Gyalshing',
        tags: ['Lake', 'Nature', 'Peaceful'],
        destinationtypename: 'Nature',
        popularityCount: 71,
        seasons: ['All'],
        addedOn: '2025-03-25T09:45:00Z'
      },
      {
        slug: 'yumthang-valley',
        destinationname: 'Yumthang Valley',
        destinationdescription: 'Known as the "Valley of Flowers" with hot springs and stunning views.',
        image: 'assets/Images/destinations/yumthang-valley.jpg',
        duration: 'Full day',
        districtname: 'Mangan',
        tags: ['Flowers', 'Hot Springs', 'Scenic'],
        destinationtypename: 'Nature',
        popularityCount: 90,
        seasons: ['Spring', 'Summer'],
        addedOn: '2025-01-20T10:15:00Z'
      },
      {
        slug: 'bar-changay-waterfalls',
        destinationname: 'Bar Changay Waterfalls',
        destinationdescription: 'Tiered waterfall in lush forest setting, ideal for picnics.',
        image: 'assets/Images/destinations/bar-changay-waterfalls.jpg',
        duration: '2-3 hours',
        districtname: 'Gyalshing',
        tags: ['Waterfall', 'Nature', 'Picnic'],
        destinationtypename: 'Nature',
        popularityCount: 73,
        seasons: ['Monsoon', 'Autumn'],
        addedOn: '2025-04-10T13:00:00Z'
      },
      {
        slug: 'daramdin',
        destinationname: 'Daramdin',
        destinationdescription: 'Offbeat village known for its orange orchards and peaceful ambiance.',
        image: 'assets/Images/destinations/daramdin.jpg',
        duration: '3-4 hours',
        districtname: 'Gyalshing',
        tags: ['Village', 'Orchards', 'Offbeat'],
        destinationtypename: 'Cultural',
        popularityCount: 68,
        seasons: ['All'],
        addedOn: '2025-02-28T11:30:00Z'
      },
      {
        slug: 'zeropoint',
        destinationname: 'Zero Point',
        destinationdescription: 'Last civilian point near India-China border with snow-covered landscapes.',
        image: 'assets/Images/destinations/zeropoint.jpg',
        duration: 'Full day',
        districtname: 'Mangan',
        tags: ['Border', 'Snow', 'Adventure'],
        destinationtypename: 'Adventure',
        popularityCount: 86,
        seasons: ['Summer'],
        addedOn: '2025-03-18T08:45:00Z'
      },
      {
        slug: 'mankhim-temple',
        destinationname: 'Mankhim Temple',
        destinationdescription: 'Important temple of the Rai community with unique architecture.',
        image: 'assets/Images/destinations/mankhim-temple.jpg',
        duration: '1-2 hours',
        districtname: 'Pakyong',
        tags: ['Temple', 'Tribal', 'Architecture'],
        destinationtypename: 'Cultural',
        popularityCount: 69,
        seasons: ['All'],
        addedOn: '2025-04-15T12:00:00Z'
      },
      {
        slug: 'dodak',
        destinationname: 'Dodak',
        destinationdescription: 'Small village known for its traditional Sikkimese houses and hospitality.',
        image: 'assets/Images/destinations/dodak.jpg',
        duration: '2-3 hours',
        districtname: 'Gyalshing',
        tags: ['Village', 'Traditional', 'Offbeat'],
        destinationtypename: 'Cultural',
        popularityCount: 65,
        seasons: ['All'],
        addedOn: '2025-01-22T14:30:00Z'
      },
  
      // 51-60
      {
        slug: 'samdruptse',
        destinationname: 'Samdruptse',
        destinationdescription: 'Hilltop with giant statue of Guru Padmasambhava and panoramic views.',
        image: 'assets/Images/destinations/samdruptse.jpg',
        duration: '2-3 hours',
        districtname: 'Namchi',
        tags: ['Statue', 'Viewpoint', 'Spiritual'],
        destinationtypename: 'Spiritual',
        popularityCount: 83,
        seasons: ['All'],
        addedOn: '2025-02-05T10:15:00Z'
      },
      {
        slug: 'aritargumpa-monastery',
        destinationname: 'Aritargumpa Monastery',
        destinationdescription: 'Small but historically significant monastery near Aritar.',
        image: 'assets/Images/destinations/aritargumpa-monastery.jpg',
        duration: '1 hour',
        districtname: 'Pakyong',
        tags: ['Buddhist', 'Historical', 'Peaceful'],
        destinationtypename: 'Cultural',
        popularityCount: 67,
        seasons: ['All'],
        addedOn: '2025-03-12T13:45:00Z'
      },
      {
        slug: 'hee-bermoik',
        destinationname: 'Hee Bermiok',
        destinationdescription: 'Village known for its organic farms and homestay experiences.',
        image: 'assets/Images/destinations/hee-bermoik.jpg',
        duration: '2-3 hours',
        districtname: 'Gyalshing',
        tags: ['Village', 'Organic', 'Homestay'],
        destinationtypename: 'Cultural',
        popularityCount: 72,
        seasons: ['All'],
        addedOn: '2025-04-08T11:30:00Z'
      },
      {
        slug: 'siddheshwar-dham',
        destinationname: 'Siddheshwar Dham (Char Dham)',
        destinationdescription: 'Religious complex replicating four major Hindu pilgrimage sites of India.',
        image: 'assets/Images/destinations/siddheshwar-dham.jpg',
        duration: '2-3 hours',
        districtname: 'Namchi',
        tags: ['Hindu', 'Pilgrimage', 'Architecture'],
        destinationtypename: 'Spiritual',
        popularityCount: 92,
        seasons: ['All'],
        addedOn: '2025-02-22T15:00:00Z'
      },
      {
        slug: 'lampokhari-lake',
        destinationname: 'Lampokhari Lake',
        destinationdescription: 'Beautiful lake in Aritar surrounded by forested hills.',
        image: 'assets/Images/destinations/lampokhari-lake.jpg',
        duration: '1-2 hours',
        districtname: 'Pakyong',
        tags: ['Lake', 'Nature', 'Boating'],
        destinationtypename: 'Nature',
        popularityCount: 74,
        seasons: ['All'],
        addedOn: '2025-03-20T10:00:00Z'
      },
      {
        slug: 'kathok-lake',
        destinationname: 'Kathok Lake',
        destinationdescription: 'Small sacred lake believed to have healing properties.',
        image: 'assets/Images/destinations/kathok-lake.jpg',
        duration: '1 hour',
        districtname: 'Gyalshing',
        tags: ['Lake', 'Sacred', 'Spiritual'],
        destinationtypename: 'Spiritual',
        popularityCount: 70,
        seasons: ['All'],
        addedOn: '2025-04-12T14:30:00Z'
      },
      {
        slug: 'temi-tea-garden',
        destinationname: 'Temi Tea Garden',
        destinationdescription: 'Sikkim\'s only tea estate producing premium organic tea.',
        image: 'assets/Images/destinations/temi-tea-garden.jpg',
        duration: '2-3 hours',
        districtname: 'Namchi',
        tags: ['Tea', 'Plantation', 'Organic'],
        destinationtypename: 'Agriculture',
        popularityCount: 81,
        seasons: ['All'],
        addedOn: '2025-01-28T12:45:00Z'
      },
      {
        slug: 'baba-harbhajan-memorial',
        destinationname: 'Baba Harbhajan Singh Memorial',
        destinationdescription: 'Shrine dedicated to an Indian soldier believed to protect border areas.',
        image: 'assets/Images/destinations/baba-harbhajan-memorial.jpg',
        duration: '1 hour',
        districtname: 'Gangtok',
        tags: ['Memorial', 'Army', 'Spiritual'],
        destinationtypename: 'Historical',
        popularityCount: 84,
        seasons: ['All'],
        addedOn: '2025-02-18T09:30:00Z'
      },
      {
        slug: 'tendong-hill',
        destinationname: 'Tendong Hill',
        destinationdescription: 'Sacred hill associated with Lepcha legends offering panoramic views.',
        image: 'assets/Images/destinations/tendong-hill.jpg',
        duration: '3-4 hours',
        districtname: 'Namchi',
        tags: ['Sacred', 'Trekking', 'Viewpoint'],
        destinationtypename: 'Nature',
        popularityCount: 75,
        seasons: ['All'],
        addedOn: '2025-03-28T11:15:00Z'
      },
      {
        slug: 'phurchachu-hot-springs',
        destinationname: 'Phurchachu Hot Springs',
        destinationdescription: 'Therapeutic hot springs believed to have healing properties.',
        image: 'assets/Images/destinations/phurchachu-hot-springs.jpg',
        duration: '2-3 hours',
        districtname: 'Gangtok',
        tags: ['Hot Springs', 'Healing', 'Nature'],
        destinationtypename: 'Nature',
        popularityCount: 79,
        seasons: ['All'],
        addedOn: '2025-04-18T10:45:00Z'
      }
    ];
  }
  
}
