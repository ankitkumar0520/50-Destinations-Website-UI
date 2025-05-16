import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FacilitiesComponent implements OnInit {
  private destinationService = inject(DestinationService);
  private platformId = inject(PLATFORM_ID);
  imageService = inject(ImageService);
  baseUrl = '';

  facilities: any[] = [];
  isMobile = false;

  constructor() {}

  ngOnInit() {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/\s+/g, ' ').trim();

    this.destinationService.destination$.subscribe((dest) => {
      if (dest?.entities) {
        this.facilities = dest.entities.filter((entity: any) => {
          if (!entity) return false; // Skip if entity is null or undefined

          // Normalize sectorName, check case insensitively
          const name = normalize(entity.sectorName || '').toLowerCase();

          // Check if sectorId is 2 or if sectorName matches 'facilities & services' case-insensitively
          return entity.sectorId === 2 || name === 'facilities & services';
        });
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      // Initialize screen size detection
      this.checkScreenSize();
      window.addEventListener('resize', this.checkScreenSize.bind(this));
    }
  }

  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 1024; // lg breakpoint in Tailwind
    }
  }
}
