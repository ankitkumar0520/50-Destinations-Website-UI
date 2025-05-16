import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';
import { SwiperContainer } from 'swiper/element/bundle';

@Component({
  selector: 'app-points-of-interest',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './points-of-interest.component.html',
  styleUrls: ['./points-of-interest.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PointsOfInterestComponent implements OnInit, OnDestroy {
  private destinationService = inject(DestinationService);
  imageService = inject(ImageService);
  pointsOfInterest: any[] = [];
  baseUrl = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.currentImageIndices = this.pointsOfInterest.map(() => 0);
  }

  ngOnInit(): void {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/\s+/g, ' ').trim();

    this.destinationService.destination$.subscribe((dest: any) => {
      if (dest?.entities) {
        this.pointsOfInterest = dest.entities.filter((entity: any) => {
          if (!entity) return false; // Skip if entity is null or undefined

          // Normalize sectorName, check case insensitively
          const name = normalize(entity.sectorName || '').toLowerCase();

          // Check if sectorId is 3 or if sectorName matches 'Point Of Interest' case-insensitively
          return entity.sectorId === 3 || name === 'point of interest';
        });

        this.currentImageIndices = this.pointsOfInterest.map(() => 0);
      }
    });
  }

  ngOnDestroy(): void {}

  swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: true,
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  };

  imageSwiperConfig = {
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    allowTouchMove: false,
  };

  @ViewChildren('imageSwiper') imageSwipers!: QueryList<SwiperContainer | any>;

  // Track current image index for each card
  currentImageIndices: number[] = [];

  // Card swiper changed
  onCardSlideChange() {
    // Reset all image indices when card changes
    this.currentImageIndices = this.currentImageIndices.map(() => 0);

    // Optional: Reset all image swipers to first slide
    this.imageSwipers.forEach((swiper) => {
      swiper.swiper.slideTo(0);
    });
  }

  // Image swiper changed
  onImageSlideChange(cardIndex: number, swiper: SwiperContainer) {
    const swiperEl = swiper?.swiper ?? swiper;
    this.currentImageIndices[cardIndex] = swiperEl.activeIndex;
    // Force change detection
    this.currentImageIndices = [...this.currentImageIndices];
  }

  // Navigate to next image
  nextImage(cardIndex: number) {
    const swiper = this.imageSwipers.toArray()[cardIndex];
    if (
      swiper &&
      this.currentImageIndices[cardIndex] <
        this.pointsOfInterest[cardIndex].media.length - 1
    ) {
      const swiperEl = swiper.swiper ?? swiper?.nativeElement?.swiper;
      swiperEl?.slideNext();
      this.onImageSlideChange(cardIndex, swiperEl);
    }
  }

  // Navigate to previous image
  prevImage(cardIndex: number) {
    const swiper = this.imageSwipers.toArray()[cardIndex];
    if (swiper && this.currentImageIndices[cardIndex] > 0) {
      const swiperEl = swiper.swiper ?? swiper?.nativeElement?.swiper;
      swiperEl?.slidePrev();
      this.onImageSlideChange(cardIndex, swiperEl);
    }
  }

  // Navigate to specific image
  goToImage(cardIndex: number, imageIndex: number) {
    const swiper = this.imageSwipers.toArray()[cardIndex];
    if (
      swiper &&
      imageIndex >= 0 &&
      imageIndex < this.pointsOfInterest[cardIndex].media.length
    ) {
      const swiperEl = swiper.swiper ?? swiper?.nativeElement?.swiper;
      swiperEl.slideTo(imageIndex);
      this.currentImageIndices[cardIndex] = imageIndex;
      // Force change detection
      this.currentImageIndices = [...this.currentImageIndices];
    }
  }
}
