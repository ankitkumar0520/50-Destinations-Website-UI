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



//sample data for testing
public  dummyResults = [
  {
    id: 1,
    title: "Sunset Beach Resort",
    description: "A luxurious beachfront property with stunning ocean views and world-class amenities for the perfect vacation getaway.",
    image: "https://example.com/images/resort1.jpg",
    duration: "3 days",
    location: "North District",
    tags: ["Beach", "Luxury", "Family"],
  },
  {
    id: 2,
    title: "Mountain Adventure Camp",
    description: "Experience thrilling outdoor activities in this scenic mountain retreat with hiking trails and camping facilities.",
    image: "https://example.com/images/camp1.jpg",
    duration: "5 days",
    location: "West District",
    tags: ["Adventure", "Hiking", "Nature"],
  },
  {
    id: 3,
    title: "Urban Business Hotel",
    description: "Modern accommodations in the city center with excellent conference facilities and quick access to business districts.",
    image: "https://example.com/images/hotel1.jpg",
    duration: "2 days",
    location: "Central District",
    tags: ["Business", "Downtown", "WiFi"],
  },
  {
    id: 4,
    title: "Historic Village Tour",
    description: "Immerse yourself in local culture with guided tours of traditional architecture and artisan workshops.",
    image: "https://example.com/images/village1.jpg",
    duration: "1 day",
    location: "East District",
    tags: ["Cultural", "Tour", "History"],
  },
  {
    id: 5,
    title: "Lakeside Cabin Retreat",
    description: "Cozy wooden cabins with private docks and fishing equipment included for a peaceful nature escape.",
    image: "https://example.com/images/cabin1.jpg",
    duration: "4 days",
    location: "South District",
    tags: ["Quiet", "Fishing", "Romantic"],
  },
  {
    id: 6,
    title: "Wine Country Villa",
    description: "Vineyard estate with wine tasting sessions and gourmet dining featuring local produce.",
    image: "https://example.com/images/villa1.jpg",
    duration: "3 days",
    location: "North District",
    tags: ["Wine", "Gourmet", "Luxury"],
  },
  {
    id: 7,
    title: "Ski Lodge & Spa",
    description: "Winter sports paradise with direct slope access and après-ski relaxation in our heated pools and spa.",
    image: "https://example.com/images/ski1.jpg",
    duration: "7 days",
    location: "Mountain District",
    tags: ["Skiing", "Winter", "Spa"],
  },
  {
    id: 8,
    title: "Desert Oasis Glamping",
    description: "Luxury tent accommodations with stargazing decks and guided desert exploration tours.",
    image: "https://example.com/images/glamping1.jpg",
    duration: "2 days",
    location: "Arid District",
    tags: ["Unique", "Stargazing", "Adventure"],
  }
];








}
