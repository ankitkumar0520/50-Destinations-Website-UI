import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.182370726!2d-0.10159865000000001!3d51.52864165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';
  isMapExpanded = false;

  markers = [
    { title: 'London Eye', description: 'Iconic observation wheel' },
    { title: 'Big Ben', description: 'Historic clock tower' },
    { title: 'Buckingham Palace', description: 'Royal residence' }
  ];

  toggleMapSize() {
    this.isMapExpanded = !this.isMapExpanded;
  }
}
