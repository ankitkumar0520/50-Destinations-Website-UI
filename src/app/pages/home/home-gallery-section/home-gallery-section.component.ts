import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { getGradientClasses, shareQRCode, downloadQRCode } from '../../../utils/utils';
import { ApiService } from '../../../services/api.service';
import { ImageService } from '../../../services/image.service';
import { SlugifyPipe } from "../../../pipes/slugify.pipe";
import { RouterModule } from '@angular/router';

export interface Destination {
  destinationname: string;
  destinationtypename: string;
  media: {
    mediaurl: string;
  }[];
  destinationdescription: string;
  tags: {
    tagname: string;
  }[];
  distance: string;
  seasons: {
    seasonmonth: string;
  }[];
  duration: string;
  districtname: string;
  slug: string;
}


@Component({
  selector: 'app-home-gallery-section',
  standalone: true,
  imports: [CommonModule, QRCodeComponent, SectionHeaderComponent, SlugifyPipe, RouterModule],
  templateUrl: './home-gallery-section.component.html',
  styleUrl: './home-gallery-section.component.css',
})

export class HomeGallerySectionComponent implements OnInit {
  isQRVisibleMap: { [key: number]: boolean } = {};
  shareUrl: string = '';
  imageService = inject(ImageService);
  apiService = inject(ApiService);

  destinations: Destination[] = [];

  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.shareUrl = window.location.origin;
    }
  }


  
  ngOnInit(): void {
    // Using static data, no need to call API
     this.getPopularDestinations();
  }

  switchQR(index: number): void {
    this.isQRVisibleMap[index] = !this.isQRVisibleMap[index];
  }

  shareQR(destination: any): void {
    const url = `${this.shareUrl}/destination/${destination.slug}`;
    shareQRCode(
      url,
      `Explore ${destination.name}`,
      `Check out ${destination.name} in Sikkim!`
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
        next:(res:any)=>{
          if (res && res.length > 0) {
            this.destinations = res;
          }
        },
        error: (error: any) => {
          console.error('Error fetching popular destinations:', error);
        }
      });
  }
       
      
  
}
