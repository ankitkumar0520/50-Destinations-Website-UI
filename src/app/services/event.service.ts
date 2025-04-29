import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private pdfUrl: string = '';
  private pdfName: string = '';

  constructor() { }

  setPdfUrl(pdfUrl: string) {
    this.pdfUrl = pdfUrl;
  }

  getPdfUrl() {
    return this.pdfUrl;
  }

  getEvents(): any[] {
    return [
      {
        id: 1,
        name: 'Sikkim Rural Tourism Meet 2025',
        date: new Date('2025-03-22'),
        location: 'Uttarey, West Sikkim',
        pdfUrl: 'assets/PDF/dummy.pdf'
      },
      {
        id: 2,
        name: 'Cham Dance Festival',
        date: new Date('2025-02-15'),
        location: 'Pemayangtse Monastery, Gyalshing District',
        pdfUrl: 'assets/PDF/dummy.pdf'
      },
      {
        id: 3,
        name: 'Maghey Sankranti Mela 2025',
        date: new Date('2025-01-14'),
        location: 'Jorethang, South Sikkim',
        pdfUrl: 'assets/PDF/dummy.pdf'
      },
      {
        id: 4,
        name: 'Sikkim Art and Literature Festival',
        date: new Date('2025-04-01'),
        location: 'Gangtok, East Sikkim',
        pdfUrl: 'assets/PDF/dummy.pdf'
      },
      {
        id: 5,
        name: '50 Years of Statehood Celebrations',
        date: new Date('2025-05-16'),
        location: 'Statewide',
        pdfUrl: 'assets/PDF/dummy.pdf'
      },
      {
        id: 6,
        name: 'Sikkim Statehood Day',
        date: new Date('2025-05-15'),
        location: 'Statewide',
        pdfUrl: 'assets/PDF/dummy.pdf'
      },
      {
        id: 7,
        name: 'Heritage Walk',
        date: new Date('2025-05-01'),
        location: 'Statewide',
        pdfUrl: 'assets/PDF/dummy.pdf'
      }
    ];
  }
  
  
}
