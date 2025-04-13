import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { QrCodeComponent } from 'ng-qrcode';

import {
  destroyOwlInstance,
  initializeOwlCarousel,
} from '../../../utils/utils';

interface District {
  id: number;
  name: string;
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
  imports: [CommonModule,QrCodeComponent],
  templateUrl: './home-district-carousel.component.html',
  styleUrl: './home-district-carousel.component.css',
})
export class HomeDistrictCarouselComponent
  implements OnInit, AfterViewInit, OnDestroy
{

  
  siteUrl:string=window.location.origin;
  isQRVisibleMap: { [key: number]: boolean } = {};


  features: Feature[] = [
    {
      icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9',
      text: 'Rich Cultural Heritage',
    },
    {
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
      text: 'Top Tourist Attractions',
    },
    {
      icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
      text: 'Seamlessly Connected Destinations',
    },
  ];

  districts: District[] = [
    {
      id: 1,
      name: 'Gangtok',
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
      description:
        "South Sikkim's district headquarters, famous for its religious sites and organic farming. Features the world's largest statue of Guru Padmasambhava.",
      image: 'assets/Images/districts/namchi.jpg',
      keyPlaces: ['Samdruptse', 'Char Dham', 'Temi Tea Garden', 'Tendong Hill'],
      population: '50,000+',
      elevation: '4,500 ft',
    },
    {
      id: 3,
      name: 'Pelling',
      description:
        'A scenic town in West Sikkim offering the best views of Kanchenjunga. Known for its ancient monasteries and trekking routes.',
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
    {
      id: 4,
      name: 'Mangan',
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
      name: 'Gyalshing',
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
  ];

  selectedDistrict: District | null = null;

  ngOnInit(): void {
    // Initialization logic can be added here
  }

  ngAfterViewInit(): void {
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
  trackByIndex(index: number, item: any): any {
    return index;
  }
  

  ngOnDestroy(): void {
    destroyOwlInstance('.district-carousel');
  }

  selectDistrict(district: District): void {
    this.selectedDistrict = district;
  }

  switchQR(i:number){
    this.isQRVisibleMap[i]=!this.isQRVisibleMap[i]
  }
}
