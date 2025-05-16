import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-gallery-description',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './gallery-description.component.html',
  styleUrls: ['./gallery-description.component.css'],
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void <=> *', [animate('200ms ease-out')]),
    ]),
  ],
})
export class GalleryDescriptionComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  imageService = inject(ImageService);
  private destinationService = inject(DestinationService);

  displayGalleria: boolean = false;
  activeIndex: number = 0;
  baseUrl = '';
  // Sample destination data
  destination: any;

  // Calculate image count from destination data
  get imageCount(): number {
    return this.destination?.media?.length || 0;
  }

  constructor() {}

  ngOnInit(): void {
    this.destinationService.destination$.subscribe((dest) => {
      if (dest) {
        this.destination = dest;
      }
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  showGalleria(index: number): void {
    if (index >= 0 && index < this.imageCount) {
      this.activeIndex = index;
      this.displayGalleria = true;
    }
  }

  navigatePrevious(): void {
    if (this.imageCount > 0) {
      this.activeIndex =
        (this.activeIndex - 1 + this.imageCount) % this.imageCount;
    }
  }

  navigateNext(): void {
    if (this.imageCount > 0) {
      this.activeIndex = (this.activeIndex + 1) % this.imageCount;
    }
  }
}
