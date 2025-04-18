import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { RouterLink } from '@angular/router';

import {
  destroyOwlInstance,
  initializeOwlCarousel,
  shareQRCode,
  downloadQRCode,
  getGradientClasses,
} from '../../../utils/utils';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';

interface District {
  id: number;
  name: string;
  value: string;
  description: string;
  image: string;
  keyPlaces: string[];
  population: string;
  elevation: string;
}

interface Feature {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-home-district-carousel',
  standalone: true,
  imports: [CommonModule, QRCodeComponent, SectionHeaderComponent, RouterLink],
  templateUrl: './home-district-carousel.component.html',
  styleUrl: './home-district-carousel.component.css',
})
export class HomeDistrictCarouselComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private platformId = inject(PLATFORM_ID);

  siteUrl: string = isPlatformBrowser(this.platformId)
    ? window.location.origin
    : '';
  isQRVisibleMap: { [key: number]: boolean } = {};

  features: Feature[] = [
    {
      icon: 'fas fa-landmark',
      text: 'Rich Cultural Heritage',
    },
    {
      icon: 'fas fa-map-marker-alt',
      text: 'Top Tourist Attractions',
    },
    {
      icon: 'fas fa-route',
      text: 'Seamlessly Connected Destinations',
    },
  ];

  districts: District[] = [
    {
      id: 1,
      name: 'Gangtok',
      value: 'gangtok',
      description:
        'The capital city district of Sikkim, known for its monasteries, viewpoints, and vibrant culture. Home to many popular tourist destinations including Nathula Pass and Tsomgo Lake.',
      image: 'assets/Images/districts/gangtok.jpg',
      keyPlaces: ['Tsomgo Lake', 'Nathula Pass', 'MG Marg', 'Hanuman Tok'],
      population: '100,000+',
      elevation: '5,500 ft',
    },
    {
      id: 2,
      name: 'Namchi',
      value: 'namchi',
      description:
        "South Sikkim's district headquarters, famous for its religious sites and organic farming. Features the world's largest statue of Guru Padmasambhava.",
      image: 'assets/Images/districts/namchi.jpg',
      keyPlaces: ['Samdruptse', 'Char Dham', 'Temi Tea Garden', 'Tendong Hill'],
      population: '50,000+',
      elevation: '4,500 ft',
    },

    {
      id: 4,
      name: 'Mangan',
      value: 'mangan',
      description:
        'The gateway to North Sikkim, featuring pristine landscapes, hot springs, and high-altitude lakes. Perfect for adventure tourism.',
      image: 'assets/Images/districts/mangan.jpg',
      keyPlaces: [
        'Gurudongmar Lake',
        'Yumthang Valley',
        'Dzongu',
        'Seven Sisters Waterfall',
      ],
      population: '40,000+',
      elevation: '3,950 ft',
    },
    {
      id: 5,
      name: 'Geyzing',
      value: 'geyzing',
      description:
        'An emerging tourist destination known for its rich biodiversity and cultural heritage. Home to several important monasteries.',
      image: 'assets/Images/districts/gyalshing.jpg',
      keyPlaces: [
        'Dubdi Monastery',
        'Kangchendzonga National Park',
        'Tashiding Monastery',
        'Yuksom',
      ],
      population: '35,000+',
      elevation: '5,600 ft',
    },
    {
      id: 6,
      name: 'Pakyong',
      value: 'pakyong',
      description:
        "Home to Sikkim's only airport, this district offers beautiful landscapes and is known for its educational institutions and scenic beauty.",
      image: 'assets/Images/districts/pakyong.jpeg',
      keyPlaces: [
        'Pakyong Airport',
        'Lungthung Valley',
        'Zuluk',
        'Aritar Lake',
      ],
      population: '45,000+',
      elevation: '4,600 ft',
    },
    {
      id: 3,
      name: 'Soreng',
      value: 'soreng',
      description:
        'A scenic district in West Sikkim region offering stunning views of Kanchenjunga. Known for its ancient monasteries and trekking routes.',
      image: 'assets/Images/districts/pelling.jpg',
      keyPlaces: [
        'Pemayangtse Monastery',
        'Khecheopalri Lake',
        'Rabdentse Ruins',
        'Singshore Bridge',
      ],
      population: '30,000+',
      elevation: '6,800 ft',
    },
  ];

  selectedDistrict: District | null = null;

  ngOnInit(): void {
    // Initialization logic can be added here
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        initializeOwlCarousel(
          '.district-carousel',
          false,
          true,
          0,
          false,
          [1, 3, 4]
        );
      }, 300);
    }
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      destroyOwlInstance('.district-carousel');
    }
  }

  selectDistrict(district: District): void {
    this.selectedDistrict = district;
  }

  switchQR(i: number): void {
    this.isQRVisibleMap[i] = !this.isQRVisibleMap[i];
  }

  shareQR(i: number): void {
    const district = this.districts[i];
    const url = `${this.siteUrl}/${district.value}`;
    shareQRCode(
      url,
      `Explore ${district.name}`,
      `Check out ${district.name} in Sikkim!`
    );
  }

  downloadQR(i: number): void {
    const district = this.districts[i];
    downloadQRCode(district.name, `qrcode:nth-of-type(${i + 1}) canvas`);
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getGradientClasses(district: string): string[] {
    return getGradientClasses(district);
  }
}
