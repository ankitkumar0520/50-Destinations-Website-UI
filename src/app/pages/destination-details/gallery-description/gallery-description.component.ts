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
  imageCount: number = 0;
  
  private destinationService = inject(DestinationService);

  // Sample destination data
  destination= this.destinationService.getDestionation();


  constructor() {

  }

  ngOnInit(): void {
    // Initialization logic can be added here
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }

  showGalleria(index: number): void {
    this.activeIndex = index;
    this.displayGalleria = true;
  }
}
