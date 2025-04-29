import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
interface Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  pdfUrl: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule]
})
export class EventsComponent implements OnInit {

  eventService: EventService = inject(EventService);
  router: Router = inject(Router);

  p: number = 1;
  searchTerm: string = '';
  filteredEvents: Event[] = [];
  pdfUrl: string = '';

  events: any[] = this.eventService.getEvents();

  constructor() {
    this.filteredEvents = [...this.events];
  }

  ngOnInit(): void {
    this.filteredEvents = this.filterAndSortEvents(this.events);
  }

  filterEvents(): void {
    if (!this.searchTerm) {
      this.filteredEvents = [...this.events];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event => 
      event.name.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower) ||
      event.date.toLocaleDateString().toLowerCase().includes(searchLower)
    );
  }

   filterAndSortEvents(events: Event[]): Event[] {
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return !isNaN(eventDate.getTime()); // Ensure the date is valid
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  

  viewEvent(pdfUrl: string): void {
    this.eventService.setPdfUrl(pdfUrl);
    this.router.navigate(['/view-pdf']);  
  }


}
