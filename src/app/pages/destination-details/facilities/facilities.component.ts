import { Component, OnInit, AfterViewInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SectionHeaderComponent } from "../../../common/section-header/section-header.component";

interface Facility {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  location: string;
  distance: string;
  tags: {
    text: string;
    icon: string;
    color: string;
  }[];
  buttonText: string;
  buttonIcon: string;
}

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FacilitiesComponent implements OnInit, AfterViewInit {
  facilities: Facility[] = [
    {
      id: 'parking',
      title: 'Secure Parking',
      subtitle: 'Convenient Parking',
      description: 'Safe and convenient parking options with 24/7 security and easy access to the main area.',
      image: 'assets/Images/rumtek-monastry/parking.png',
      imageAlt: 'Parking',
      location: 'Main Parking Area',
      distance: '200m from main entrance',
      tags: [
        { text: '24/7 Access', icon: '🕒', color: 'green' },
        { text: 'Secure', icon: '🔒', color: 'yellow' }
      ],
      buttonText: 'Explore Location',
      buttonIcon: '🅿️'
    },
    {
      id: 'taxi',
      title: 'Taxi Services',
      subtitle: 'Easy Transportation',
      description: 'Convenient taxi services available round the clock for all your travel needs.',
      image: 'assets/Images/rumtek-monastry/taxi-stand.png',
      imageAlt: 'Taxi Stand',
      location: 'Main Taxi Stand',
      distance: '100m from main entrance',
      tags: [
        { text: '10am-5pm Service', icon: '🕒', color: 'indigo' },
        { text: 'Multiple Options', icon: '🚗', color: 'green' },
        { text: 'UPI Accepted', icon: '💳', color: 'yellow' }
      ],
      buttonText: 'Explore Location',
      buttonIcon: '🚕'
    },
    {
      id: 'atm',
      title: 'ATM Services',
      subtitle: 'Financial Services',
      description: 'Easy access to cash withdrawal and banking services with multiple ATM options.',
      image: 'assets/Images/rumtek-monastry/ATM.png',
      imageAlt: 'ATM',
      location: 'Main ATM Center',
      distance: '150m from main entrance',
      tags: [
        { text: '24/7 Available', icon: '🕒', color: 'indigo' },
        { text: 'Multiple Banks', icon: '🏦', color: 'green' },
        { text: 'Cash Available', icon: '💵', color: 'yellow' }
      ],
      buttonText: 'Explore Location',
      buttonIcon: '💳'
    }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    register();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Force change detection
      this.cdr.detectChanges();
      
      // Initialize Swiper after view is initialized
      const initializeSwiper = () => {
        const swiperElements = document.querySelectorAll('swiper-container');
        swiperElements.forEach((element: any) => {
          if (!element.swiper) {
            const params = {
              slidesPerView: 1,
              spaceBetween: 24,
              breakpoints: {
                640: {
                  slidesPerView: 1,
                  spaceBetween: 24
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24
                }
              },
              pagination: {
                clickable: true,
                el: '.swiper-pagination',
                type: 'bullets',
                dynamicBullets: true
              },
              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              },
              loop: true,
              grabCursor: true,
              observer: true,
              observeParents: true
            };

            Object.assign(element, params);
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
