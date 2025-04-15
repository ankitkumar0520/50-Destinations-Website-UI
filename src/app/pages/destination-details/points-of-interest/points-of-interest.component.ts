import { Component, OnInit, AfterViewInit, ChangeDetectorRef, PLATFORM_ID, Inject, inject } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';

@Component({
  selector: 'app-points-of-interest',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './points-of-interest.component.html',
  styleUrls: ['./points-of-interest.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PointsOfInterestComponent implements OnInit, AfterViewInit {

  private destinationService =inject( DestinationService)

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    register();
  }

  destination = this.destinationService.getDestionation();

  ngOnInit(): void {
    
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
