import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-home-gallery-section',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './home-gallery-section.component.html',
  styleUrl: './home-gallery-section.component.css',
})
export class HomeGallerySectionComponent {
  isQRVisibleMap: { [key: number]: boolean } = {};
  siteUrl: string = '';

  destinations = [
    {
      id: 1,
      name: 'Tsomgo Lake',
      type: 'Natural Lake',
      image: 'assets/Images/destinations/tsomgo-lake.jpg',
      description:
        'A sacred glacial lake located at an altitude of 12,400 ft. The oval-shaped lake is a visual treat with crystal clear waters reflecting different colors throughout the year.',
      highlights: [
        'Sacred Site',
        'Yak Rides Available',
        'Stunning Views',
        'Crystal Clear Waters',
      ],
      location: '40 km from Gangtok',
      bestTime: 'May to September',
      duration: '2-3 hours',
    },
    {
      id: 2,
      name: 'Nathula Pass',
      type: 'Mountain Pass',
      image: 'assets/Images/destinations/nathula-pass.jpg',
      description:
        'A historic mountain pass in the Himalayas that connects Sikkim with Tibet. Located at 14,140 ft, it offers breathtaking views and holds significant historical importance.',
      highlights: [
        'Indo-China Border',
        'Snow Views',
        'Historic Site',
        'Mountain Views',
      ],
      location: '56 km from Gangtok',
      bestTime: 'April to May',
      duration: 'Full Day',
    },
    {
      id: 3,
      name: 'MG Marg',
      type: 'Shopping & Entertainment',
      image: 'assets/Images/destinations/mg-marg.jpg',
      description:
        'The heart of Gangtok city, this pedestrian-only zone is known for its vibrant atmosphere, cafes, and shopping. A perfect place to experience local culture and modern amenities.',
      highlights: [
        'Shopping Hub',
        'Cafes & Restaurants',
        'Cultural Center',
        'Evening Activities',
      ],
      location: 'Central Gangtok',
      bestTime: 'Throughout Year',
      duration: '2-4 hours',
    },
    {
      id: 4,
      name: 'Yumthang Valley',
      type: 'Valley of Flowers',
      image: 'assets/Images/destinations/yumthang-valley.jpg',
      description:
        'Known as the "Valley of Flowers", this stunning valley is a paradise for nature lovers. In spring, it transforms into a carpet of colorful rhododendrons and other alpine flowers.',
      highlights: [
        'Flower Valley',
        'Hot Springs',
        'River Views',
        'Scenic Beauty',
      ],
      location: 'North Sikkim',
      bestTime: 'March to June',
      duration: 'Full Day',
    },
    {
      id: 5,
      name: 'Baba Harbhajan Singh Mandir',
      type: 'Spiritual Site',
      image: 'assets/Images/destinations/baba-harbhajan-mandir.jpg',
      description:
        "A memorial dedicated to Indian soldier Harbhajan Singh, believed to be a guardian spirit of the area. Set amidst the mountains, it's both spiritually uplifting and scenic.",
      highlights: [
        'Spiritual Significance',
        'Mountain Views',
        'Patriotic Site',
        'Peaceful Vibe',
      ],
      location: 'Between Nathula & Jelep La Pass',
      bestTime: 'April to June, October to November',
      duration: '2-3 hours',
    },
    {
      id: 6,
      name: 'Ravangla Buddha Park',
      type: 'Cultural Landmark',
      image: 'assets/Images/destinations/buddha-park.jpg',
      description:
        'Home to a massive 130-foot statue of Lord Buddha set in beautifully landscaped gardens. Offers panoramic views of the Himalayas and peaceful surroundings.',
      highlights: [
        'Giant Buddha Statue',
        'Scenic Gardens',
        'Photography Spot',
        'Spiritual Calm',
      ],
      location: 'Ravangla, South Sikkim',
      bestTime: 'March to May, September to November',
      duration: '1-2 hours',
    },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.siteUrl = window.location.origin;
    }
  }

  switchQR(index: number): void {
    this.isQRVisibleMap[index] = !this.isQRVisibleMap[index];
  }

  shareQR(index: number): void {
    const destination = this.destinations[index];
    const url = this.siteUrl + '/' + destination.name.toLowerCase();

    if (navigator.share) {
      navigator
        .share({
          title: `Explore ${destination.name}`,
          text: `Check out ${destination.name} in Sikkim!`,
          url: url,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      const tempInput = document.createElement('input');
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Link copied to clipboard!');
    }
  }

  downloadQR(index: number): void {
    const qrCodeElement = document.querySelector(
      `.qr-container:nth-child(${index + 1}) qr-code`
    );
    if (qrCodeElement) {
      const canvas = qrCodeElement.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = `${this.destinations[index].name}-qr.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }
  }
}
