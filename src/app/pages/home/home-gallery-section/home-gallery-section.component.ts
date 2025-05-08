import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { getGradientClasses, shareQRCode, downloadQRCode } from '../../../utils/utils';
import { ApiService } from '../../../services/api.service';
import { ImageService } from '../../../services/image.service';
import { SlugifyPipe } from "../../../pipes/slugify.pipe";
import { RouterModule } from '@angular/router';

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

  destinations: any = [
    {
      id: 1,
      name: 'Tsomgo Lake',
      type: 'Natural Lake',
      image: 'assets/Images/popular-places/tsomgo-lake.jpg',
      description:
        'A sacred glacial lake located at an altitude of 12,400 ft. The oval-shaped lake is a visual treat with crystal clear waters reflecting different colors throughout the year.',
      highlights: [
        'Sacred Site',
        'Yak Rides Available',
        'Stunning Views',
        'Crystal Clear Waters',
      ],
      location: '40 km from Gangtok',
      bestTime: 'May to September',
      duration: '2-3 hours',
      district: 'Gangtok',
      slug:'tsomgo-lake '
    }
  ];

  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.shareUrl = window.location.origin;
    }
  }
  
  ngOnInit(): void {
    // Using static data, no need to call API
    // this.getPopularDestinations();
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
            this.destinations = res.map((destination: any) => ({
              id: destination.destinationid,
              name: destination.destinationname,
              type: destination.destinationtypename,
              image:
                destination.media.length > 0
                  ? destination.media[0].url
                  : 'assets/Images/default-destination.jpg',
              description: destination.destinationdescription,
              highlights: destination.tags.map((tag: any) => tag.tagname),
              location: destination.distance,
              bestTime: destination.seasons
                .map((season: any) => season.seasonmonth)
                .join(', '),
              duration: destination.duration || 'N/A',
              district: destination.districtname,
              slug: destination.slug
            }));
          }
        },
        error: (error: any) => {
          console.error('Error fetching popular destinations:', error);
        }
      });
  }
       
      
  
}
