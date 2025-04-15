import { Component, OnInit, AfterViewInit, ChangeDetectorRef, PLATFORM_ID, Inject, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SectionHeaderComponent } from "../../../common/section-header/section-header.component";
import { DestinationService } from '../../../services/destination.service';

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
  
  private destinationService = inject(DestinationService);

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    register();
  }

  destination:any;

  ngOnInit() {
    this.destination = this.destinationService.getDestionation();
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
