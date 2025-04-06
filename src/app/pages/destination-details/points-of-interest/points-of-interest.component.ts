import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  constructor(private cdr: ChangeDetectorRef) {
    register();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Force change detection
    this.cdr.detectChanges();
    if (isPlatformBrowser(this.platformId)) {
         // Initialize Swiper after view is initialized
    const initializeSwiper = () => {
      const swiperElements = document.querySelectorAll('swiper-container');
      swiperElements.forEach((element: any) => {
        if (element.swiper) {
          element.swiper.update();
        } else {
          // Initialize Swiper with default parameters
          Object.assign(element, {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
              clickable: true,
            },
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
            loop: true,
            grabCursor: true
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
  platformId(platformId: any) {
    throw new Error('Method not implemented.');
  }
}
