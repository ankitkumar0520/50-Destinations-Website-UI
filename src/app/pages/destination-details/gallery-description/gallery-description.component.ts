import { Component, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';


@Component({
  selector: 'app-gallery-description',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './gallery-description.component.html',
  styleUrls: ['./gallery-description.component.css']
})
export class GalleryDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  displayGalleria: boolean = false;
  activeIndex: number = 0;
  
  private destinationService = inject(DestinationService);

  // Sample destination data
  destination :any;

  // Calculate image count from destination data
  get imageCount(): number {
    return this.destination?.galleryImages?.length || 0;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.destinationService.destination$.subscribe(dest => {
      if (dest) {
        this.destination = dest;
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  showGalleria(index: number): void {
    if (index >= 0 && index < this.imageCount) {
      this.activeIndex = index;
      this.displayGalleria = true;
    }
  }

  navigatePrevious(): void {
    if (this.imageCount > 0) {
      this.activeIndex = (this.activeIndex - 1 + this.imageCount) % this.imageCount;
    }
  }

  navigateNext(): void {
    if (this.imageCount > 0) {
      this.activeIndex = (this.activeIndex + 1) % this.imageCount;
    }
  }
}
