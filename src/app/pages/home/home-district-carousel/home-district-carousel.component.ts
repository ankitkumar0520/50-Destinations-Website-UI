import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { destroyOwlInstance, initializeOwlCarousel } from '../../../utils/utils';

@Component({
  selector: 'app-home-district-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-district-carousel.component.html',
  styleUrl: './home-district-carousel.component.css'
})
export class HomeDistrictCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  districts = [
    {
      id: 1,
      name: 'Gangtok',
      type: 'Capital District',
      description: 'The capital city district of Sikkim, known for its monasteries, viewpoints, and vibrant culture. Home to many popular tourist destinations including Nathula Pass and Tsomgo Lake.',
      image: 'assets/Images/districts/gangtok.jpg',
      keyPlaces: [
        'Tsomgo Lake',
        'Nathula Pass',
        'MG Marg',
        'Hanuman Tok'
      ],
      population: '100,000+',
      elevation: '5,500 ft',
    },
    {
      id: 2,
      name: 'Namchi',
      type: 'South District',
      description: 'South Sikkim\'s district headquarters, famous for its religious sites and organic farming. Features the world\'s largest statue of Guru Padmasambhava.',
      image: 'assets/Images/districts/namchi.jpg',
      keyPlaces: [
        'Samdruptse',
        'Char Dham',
        'Temi Tea Garden',
        'Tendong Hill'
      ],
      population: '50,000+',
      elevation: '4,500 ft',
    },
    {
      id: 3,
      name: 'Pelling',
      type: 'West District',
      description: 'A scenic town in West Sikkim offering the best views of Kanchenjunga. Known for its ancient monasteries and trekking routes.',
      image: 'assets/Images/districts/pelling.jpg',
      keyPlaces: [
        'Pemayangtse Monastery',
        'Khecheopalri Lake',
        'Rabdentse Ruins',
        'Singshore Bridge'
      ],
      population: '30,000+',
      elevation: '6,800 ft',
    },
    {
      id: 4,
      name: 'Mangan',
      type: 'North District',
      description: 'The gateway to North Sikkim, featuring pristine landscapes, hot springs, and high-altitude lakes. Perfect for adventure tourism.',
      image: 'assets/Images/districts/mangan.jpg',
      keyPlaces: [
        'Gurudongmar Lake',
        'Yumthang Valley',
        'Dzongu',
        'Seven Sisters Waterfall'
      ],
      population: '40,000+',
      elevation: '3,950 ft',
    },
    {
      id: 5,
      name: 'Gyalshing',
      type: 'West District',
      description: 'An emerging tourist destination known for its rich biodiversity and cultural heritage. Home to several important monasteries.',
      image: 'assets/Images/districts/gyalshing.jpg',
      keyPlaces: [
        'Dubdi Monastery',
        'Kangchendzonga National Park',
        'Tashiding Monastery',
        'Yuksom'
      ],
      population: '35,000+',
      elevation: '5,600 ft',
    },
    {
      id: 6,
      name: 'Pakyong',
      type: 'East District',
      description: 'Home to Sikkim\'s only airport, this district offers beautiful landscapes and is known for its educational institutions and scenic beauty.',
      image: 'assets/Images/districts/pakyong.jpeg',
      keyPlaces: [
        'Pakyong Airport',
        'Lungthung Valley',
        'Zuluk',
        'Aritar Lake'
      ],
      population: '45,000+',
      elevation: '4,600 ft',
    }
  ];

  selectedDistrict: any = null;

  ngOnInit() {
    // Initialization logic
  }

  ngAfterViewInit() {
    // Initialize Owl Carousel with responsive settings
    setTimeout(() => {
      initializeOwlCarousel('.district-carousel', true, true, 0, false, [1, 3, 4]);
    }, 300);
  }

  ngOnDestroy() {
    // Cleanup
    destroyOwlInstance('.district-carousel');
  }

  selectDistrict(district: any) {
    this.selectedDistrict = district;
  }
}
