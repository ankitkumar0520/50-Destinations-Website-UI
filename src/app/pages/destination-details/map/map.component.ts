import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  isMapExpanded = false;

  markers = [
    { title: 'London Eye', description: 'Iconic observation wheel' },
    { title: 'Big Ben', description: 'Historic clock tower' },
    { title: 'Buckingham Palace', description: 'Royal residence' }
  ];

  constructor() {}

  ngOnInit() {
    console.log('Map component initialized');
  }

  toggleMapSize() {
    this.isMapExpanded = !this.isMapExpanded;
  }
}
