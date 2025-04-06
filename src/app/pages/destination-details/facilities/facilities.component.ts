import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Facility {
  name: string;
  distance: string;
  image: string;
  additionalInfo: string;
}

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  facilities: Facility[] = [
    {
      name: 'Parking',
      distance: '200 meters from main entrance',
      image: 'https://images.unsplash.com/photo-1561624423-5e2d0a5a8b3b',
      additionalInfo: 'Price: $5 per hour'
    },
    {
      name: 'Taxi Stand',
      distance: '100 meters from main entrance',
      image: 'https://images.unsplash.com/photo-1561624423-5e2d0a5a8b3b',
      additionalInfo: 'Available 24/7'
    },
    {
      name: 'ATM',
      distance: '150 meters from main entrance',
      image: 'https://images.unsplash.com/photo-1561624423-5e2d0a5a8b3b',
      additionalInfo: 'Working Hours: 8:00 AM - 10:00 PM'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
