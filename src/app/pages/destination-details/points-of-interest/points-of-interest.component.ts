import { Component, OnInit, AfterViewInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-points-of-interest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points-of-interest.component.html',
  styleUrls: ['./points-of-interest.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PointsOfInterestComponent implements OnInit, AfterViewInit {
  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    register();
  }

  ngOnInit(): void {
  }

  points: any[] = [
    {
      images: [
       'assets/Images/rumtek-monastry/Main-Shrine-Hall-image1.jpg',
       'assets/Images/rumtek-monastry/Main-Shrine-Hall-image2.jpg'
      ],
      imageAlt: 'Main Shrine Hall',
      location: 'Central Courtyard',
      title: 'Main Shrine Hall',
      description: 'Sacred prayer hall adorned with vibrant murals and golden Buddha statues.'
    },
    {
      images: [
         'assets/Images/rumtek-monastry/stupa1.jpg',
         'assets/Images/rumtek-monastry/stupa2.jpg'
      ],
      imageAlt: 'Golden Stupa',
      location: 'Inside the Monastery',
      title: 'Golden Stupa of the 16th Karmapa',
      description: 'A golden relic chamber housing the remains of the 16th Karmapa.'
    },
    {
      images: [
        'assets/Images/rumtek-monastry/wheels1.jpg',
        'assets/Images/rumtek-monastry/wheels2.jpg'
      ],
      imageAlt: 'Prayer Wheels',
      location: 'Monastery Perimeter',
      title: 'Rows of Prayer Wheels',
      description: 'Spin the wheels while walking the kora path for good karma.'
    },
    {
      images: [
        'assets/Images/rumtek-monastry/garden1.jpg',
        'assets/Images/rumtek-monastry/garden2.jpg',
      ],
      imageAlt: 'Meditation Spot',
      location: 'Monastery Garden',
      title: 'Peaceful Courtyard',
      description: 'Open space for silent meditation and reflection.'
    }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Force change detection
      this.cdr.detectChanges();
      
      // Initialize Swiper after view is initialized
      const initializeSwiper = () => {
        const swiperElements = document.querySelectorAll('swiper-container');
        swiperElements.forEach((element: any) => {
          if (!element.swiper) {
            Object.assign(element, {
              slidesPerView: 1,
              spaceBetween: 0,
              pagination: {
                clickable: true,
                el: '.swiper-pagination'
              },
              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
              },
              loop: true,
              grabCursor: true,
              observer: true,
              observeParents: true
            });
            element.initialize();
          }
        });
      };

      // Try to initialize immediately
      initializeSwiper();

      // Also try after a short delay to ensure DOM is ready
      setTimeout(initializeSwiper, 100);
    }
  }
}
