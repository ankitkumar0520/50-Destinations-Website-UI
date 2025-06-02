import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
interface Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  pdfUrl: string;
}

interface News {
  id: number;
  title: string;
  date: Date;
  content: string;
  imageUrl?: string;
  pdfUrl?: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
})
export class EventsComponent implements OnInit {
  eventService: EventService = inject(EventService);
  imageService: ImageService = inject(ImageService);

  // Tab related properties
  activeTab: string = 'events';
  tabs = [
    {
      id: 'events',
      title: 'Events',
      icon: 'fa-calendar-alt',
      color: 'primary',
    },
    { id: 'news', title: 'News', icon: 'fa-newspaper', color: 'emerald' },
  ];

  // Events related properties
  p: number = 1;
  searchTerm: string = '';
  filteredEvents: Event[] = [];
  pdfUrl: string = '';
  events: any[] = this.eventService.getEvents();
  news: any[] = this.eventService.getNews();
  selectedNews: News | null = null;

  filteredNews: News[] = [];

  today = new Date();

  constructor() {
    this.filteredEvents = [...this.events];
    this.filteredNews = [...this.news];
  }

  ngOnInit(): void {
    this.filteredEvents = this.filterAndSortEvents(this.events);
    this.filteredNews = this.filterAndSortNews(this.news);
  }

  // Tab switching method
  switchTab(tabId: string): void {
    this.activeTab = tabId;
    this.p = 1; // Reset pagination
  }

  // Events related methods
  filterEvents(): void {
    this.p = 1;

    if (!this.searchTerm) {
      this.filteredEvents = [...this.events];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();

    this.filteredEvents = this.events.filter((event) => {
      const eventDateString = event.date
        .toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        .toLowerCase();
      const eventLocationString = event.location.toLowerCase();

      return (
        event.name.toLowerCase().includes(searchLower) ||
        eventLocationString.includes(searchLower) ||
        eventDateString.includes(searchLower)
      );
    });
  }

  filterAndSortEvents(events: Event[]): Event[] {
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return !isNaN(eventDate.getTime());
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // News related methods
  filterNews(): void {
    this.p = 1;

    if (!this.searchTerm) {
      this.filteredNews = [...this.news];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();

    this.filteredNews = this.news.filter((news) => {
      const newsDateString = news.date
        .toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        .toLowerCase();

      return (
        news.title.toLowerCase().includes(searchLower) ||
        news.content.toLowerCase().includes(searchLower) ||
        newsDateString.includes(searchLower)
      );
    });
  }

  filterAndSortNews(news: News[]): News[] {
    return news
      .filter((item) => {
        const newsDate = new Date(item.date);
        return !isNaN(newsDate.getTime());
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  isUpcomingEvent(eventDate: string | Date): boolean {
    return new Date(eventDate) > this.today;
  }

  // Search method that handles both events and news
  search(): void {
    if (this.activeTab === 'events') {
      this.filterEvents();
    } else {
      this.filterNews();
    }
  }

  // Event status methods
  getEventStatus(eventDate: Date | string): 'upcoming' | 'ongoing' | 'ended' {
    const date = new Date(eventDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date > tomorrow) {
      return 'upcoming';
    } else if (
      date <= today &&
      date >= new Date(today.setDate(today.getDate() - 1))
    ) {
      return 'ongoing';
    } else {
      return 'ended';
    }
  }

  viewEventDetails(event: Event): void {
    // TODO: Implement event details view
    // console.log('Viewing event details:', event);
  }

  openNewsModal(news: News): void {
    this.selectedNews = news;
    document.body.style.overflow = 'hidden';
  }

  closeNewsModal(): void {
    this.selectedNews = null;
    document.body.style.overflow = 'auto';
  }

  scrollToTop(): void {
    // Scroll to top smoothly
    window.scrollTo({
      top: 60,
      behavior: 'smooth',
    });
  }
}
