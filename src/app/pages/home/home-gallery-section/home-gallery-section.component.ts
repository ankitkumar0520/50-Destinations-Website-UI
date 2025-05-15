import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import {
  getGradientClasses,
  shareQRCode,
  downloadQRCode,
} from '../../../utils/utils';
import { ApiService } from '../../../services/api.service';
import { ImageService } from '../../../services/image.service';
import { RouterModule } from '@angular/router';

export interface Destination {
  destinationname: string;
  destinationtypename: string;
  media: any;
  destinationdescription: string;
  tags: {
    tagname: string;
  }[];
  distance: string;
  seasons: any;
  duration: string;
  districtname: string;
  slug: string;
}

@Component({
  selector: 'app-home-gallery-section',
  standalone: true,
  imports: [
    CommonModule,
    QRCodeComponent,
    SectionHeaderComponent,
    RouterModule,
  ],
  templateUrl: './home-gallery-section.component.html',
  styleUrl: './home-gallery-section.component.css',
})
export class HomeGallerySectionComponent implements OnInit {
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  isQRVisibleMap: { [key: number]: boolean } = {};
  shareUrl: string = '';
  imageService = inject(ImageService);
  apiService = inject(ApiService);
  baseUrl = '';
  destinations: Destination[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.shareUrl = window.location.origin;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getPopularDestinations();
    }, 500);
  }

  switchQR(index: number): void {
    this.isQRVisibleMap[index] = !this.isQRVisibleMap[index];
  }

  shareQR(destination: any): void {
    const url = `${this.shareUrl}/destination/${destination.slug}`;
    shareQRCode(
      url,
      `Explore ${destination.destinationname}`,
      `Check out ${destination.destinationname} in Sikkim!`
    );
  }

  downloadQR(destination: any): void {
    downloadQRCode(destination.slug);
  }

  getGradientClasses(district: string): string[] {
    return getGradientClasses(district);
  }

  // Commented out API method
  getPopularDestinations() {
    this.apiService
      .get('LandingPage/GetTopMostPopularDistrictWiseDestination')
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.destinations = res;
          }
        },
        error: (error: any) => {
          console.error('Error fetching popular destinations:', error);
        },
      });
  }
}
