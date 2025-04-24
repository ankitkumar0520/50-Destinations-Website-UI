import { Component, OnInit, OnDestroy, ChangeDetectorRef, PLATFORM_ID, Inject, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { initializeOwlCarousel, destroyOwlInstance } from '../../../utils/utils';
import { DestinationService } from '../../../services/destination.service';

@Component({
  selector: 'app-points-of-interest',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './points-of-interest.component.html',
  styleUrls: ['./points-of-interest.component.css']
})
export class PointsOfInterestComponent implements OnInit, OnDestroy {
  private destinationService = inject(DestinationService);
  destination = this.destinationService.getDestionation();

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const attractionCount = this.destination.touristAttractions.length;

      if (attractionCount > 2) {
        // Initialize MAIN carousel
        setTimeout(() => {
          initializeOwlCarousel('.points-of-interest-carousel', false, true, 20, false, [1, 2, 3], true);
        }, 300);

        // Initialize NESTED image carousels for MAIN carousel items
        setTimeout(() => {
          const imageCarousels = document.querySelectorAll('#points-of-interest-section .owl-carousel .point-image-carousel'); // More specific selector
          imageCarousels.forEach((carousel, index) => {
            initializeOwlCarousel(`#point-image-carousel-main-${index}`, true, true, 0, false, [1,1,1], true);
          });
        }, 500);

      } else {
        // Initialize ONLY NESTED image carousels for FLEX layout items
        setTimeout(() => {
          const imageCarousels = document.querySelectorAll('#points-of-interest-section .flex .point-image-carousel'); // More specific selector
          imageCarousels.forEach((carousel, index) => {
            initializeOwlCarousel(`#point-image-carousel-flex-${index}`, false, true, 0, false, [1,1,1], false);
          });
        }, 500);
      }
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      const attractionCount = this.destination.touristAttractions.length;

      if (attractionCount > 2) {
        // Destroy MAIN carousel
        destroyOwlInstance('.points-of-interest-carousel');
        
        // Destroy NESTED image carousels from MAIN carousel
        const imageCarousels = document.querySelectorAll('#points-of-interest-section .owl-carousel .point-image-carousel');
        imageCarousels.forEach((carousel, index) => {
          destroyOwlInstance(`#point-image-carousel-main-${index}`);
        });
      } else {
         // Destroy ONLY NESTED image carousels from FLEX layout
        const imageCarousels = document.querySelectorAll('#points-of-interest-section .flex .point-image-carousel');
        imageCarousels.forEach((carousel, index) => {
          destroyOwlInstance(`#point-image-carousel-flex-${index}`);
        });
      }
    }
  }
}
