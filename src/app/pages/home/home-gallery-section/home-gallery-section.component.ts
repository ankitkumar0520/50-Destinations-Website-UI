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
    },
    
    {
      id: 2,
      name: 'Nathula Pass',
      type: 'Mountain Pass',
      image: 'assets/Images/popular-places/nathula-pass.jpg',
      description:
        'A historic mountain pass in the Himalayas that connects Sikkim with Tibet. Located at 14,140 ft, it offers breathtaking views and holds significant historical importance.',
      highlights: [
        'Indo-China Border',
        'Snow Views',
        'Historic Site',
        'Mountain Views',
      ],
      location: '56 km from Gangtok',
      bestTime: 'Apr to May',
      duration: 'Full Day',
      district: 'Mangan',
      slug:'nathula-pass'
    },
    {
      id: 3,
      name: 'MG Marg',
      type: 'Shopping & Entertainment',
      image: 'assets/Images/popular-places/mg-marg.jpg',
      description:
        'The heart of Gangtok city, this pedestrian-only zone is known for its vibrant atmosphere, cafes, and shopping. A perfect place to experience local culture and modern amenities.',
      highlights: [
        'Shopping Hub',
        'Cafes & Restaurants',
        'Cultural Center',
        'Evening Activities',
      ],
      location: 'Central Gangtok',
      bestTime: 'Throughout Year',
      duration: '2-4 hours',
      district: 'Namchi',
      slug:'mg-marg'
    },
    {
      id: 4,
      name: 'Yumthang Valley',
      type: 'Valley of Flowers',
      image: 'assets/Images/popular-places/yumthang-valley.jpg',
      description:
        'Known as the "Valley of Flowers", this stunning valley is a paradise for nature lovers. In spring, it transforms into a carpet of colorful rhododendrons and other alpine flowers.',
      highlights: [
        'Flower Valley',
        'Hot Springs',
        'River Views',
        'Scenic Beauty',
      ],
      location: 'North Sikkim',
      bestTime: 'Mar to Jun',
      duration: 'Full Day',
      district: 'Geyzing',
      slug:'yumthang-valley'
    },
    {
      id: 5,
      name: 'Baba Harbhajan Singh Mandir',
      type: 'Spiritual Site',
      image: 'assets/Images/popular-places/baba-harbhajan-mandir.jpg',
      description:
        "A memorial dedicated to Indian soldier Harbhajan Singh, believed to be a guardian spirit of the area. Set amidst the mountains, it's both spiritually uplifting and scenic.",
      highlights: [
        'Spiritual Significance',
        'Mountain Views',
        'Patriotic Site',
        'Peaceful Vibe',
      ],
      location: 'Between Nathula & Jelep La Pass',
      bestTime: 'Apr to Jun, Oct to Nov',
      duration: '2-3 hours',
      district: 'Pakyong',
      slug:'baba-harbhajan-mandir'
    },
    {
      id: 6,
      name: 'Ravangla Buddha Park',
      type: 'Cultural Landmark',
      image: 'assets/Images/popular-places/buddha-park.jpg',
      description:
        'Home to a massive 130-foot statue of Lord Buddha set in beautifully landscaped gardens. Offers panoramic views of the Himalayas and peaceful surroundings.',
      highlights: [
        'Giant Buddha Statue',
        'Scenic Gardens',
        'Photography Spot',
        'Spiritual Calm',
      ],
      location: 'Ravangla, South Sikkim',
      bestTime: 'Mar to May, Sep to Nov',
      duration: '1-2 hours',
      district: 'Soreng',
      slug:'ravangla-buddha-park'
    }
  ];

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
    const url = `${this.shareUrl}/destinations/${destination.name.toLowerCase()}`;
    shareQRCode(
      url,
      `Explore ${destination.name}`,
      `Check out ${destination.name} in Sikkim!`
    );
  }

  downloadQR(destination: any): void {
    downloadQRCode(destination.name);
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
