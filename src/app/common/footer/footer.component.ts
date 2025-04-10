import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerData = {
    links: [
      {
        title: 'Quick Links',
        items: [
          'Home',
          'Destinations',
          'Travel Guide',
          'About Sikkim',
          'Contact Us',
        ],
      },
      {
        title: 'Travel Essentials',
        items: [
          'Best Time to Visit',
          'Local Cuisine Guide',
          'Cultural Experiences',
          'Adventure Activities',
          'Travel Tips',
        ],
      },
    ],
    websiteName: 'QR Sikkim',
    socialMedia: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/sikkim.tourism',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/sikkim.tourism',
      },
      {
        name: 'Twitter',
        url: 'https://www.twitter.com/sikkim.tourism',
      },
      {
        name: 'Youtube',
        url: 'https://www.youtube.com/sikkim.tourism',
      },
    ],
    copyright:
      '2024 Tourism and Civil Aviation Department. All rights reserved.',
    description:
      'Embark on a journey through the vibrant culture and natural beauty of Sikkim. Discover timeless monasteries, snow-capped peaks, and local traditions with our curated travel guide.',
  };
}
