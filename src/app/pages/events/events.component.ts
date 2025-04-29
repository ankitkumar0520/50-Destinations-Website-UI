import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

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
  p: number = 1;
  searchTerm: string = '';
  filteredEvents: Event[] = [];

  events: Event[] = [
    {
      id: 1,
      name: 'Sikkim Rural Tourism Meet 2025',
      date: new Date('2025-03-22'),
      location: 'Uttarey, West Sikkim',
      pdfUrl: '/assets/pdfs/sikkim-rural-tourism-meet-2025.pdf'
    },
    {
      id: 2,
      name: 'Cham Dance Festival',
      date: new Date('2025-02-15'),
      location: 'Pemayangtse Monastery, Gyalshing District',
      pdfUrl: '/assets/pdfs/cham-dance-festival-2025.pdf'
    },
    {
      id: 3,
      name: 'Maghey Sankranti Mela 2025',
      date: new Date('2025-01-14'),
      location: 'Jorethang, South Sikkim',
      pdfUrl: '/assets/pdfs/maghey-sankranti-mela-2025.pdf'
    },
    {
      id: 4,
      name: 'Sikkim Art and Literature Festival',
      date: new Date('2025-04-01'),
      location: 'Gangtok, East Sikkim',
      pdfUrl: '/assets/pdfs/sikkim-art-literature-festival-2025.pdf'
    },
    {
      id: 5,
      name: '50 Years of Statehood Celebrations',
      date: new Date('2025-05-16'),
      location: 'Statewide',
      pdfUrl: '/assets/pdfs/50-years-statehood-celebrations-2025.pdf'
    },
    {
      id: 6,
      name: 'Sikkim Statehood Day',
      date: new Date('2025-05-15'),
      location: 'Statewide',
      pdfUrl: '/assets/pdfs/sikkim-statehood-day-2025.pdf'
    }
    ,
    {
      id: 7,
      name: 'Heritage Walk',
      date: new Date('2025-05-01'),
      location: 'Statewide',
      pdfUrl: '/assets/pdfs/heritage-walk-2025.pdf'
    }
  ];

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

  

  viewEvent(event: Event): void {
    console.log('Viewing event:', event);
  }

  downloadEvent(event: Event): void {
    console.log('Downloading PDF for event:', event);
    window.open(event.pdfUrl, '_blank');
  }
}
