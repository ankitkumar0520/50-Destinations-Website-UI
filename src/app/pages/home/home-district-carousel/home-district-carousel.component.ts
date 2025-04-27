import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';


import {
  destroyOwlInstance,
  initializeOwlCarousel,
  shareQRCode,
  downloadQRCode,
  getGradientClasses,
} from '../../../utils/utils';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { ApiService } from '../../../services/api.service';
import { ImageService } from '../../../services/image.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-district-carousel',
  standalone: true,
  imports: [CommonModule, QRCodeComponent, SectionHeaderComponent],
  templateUrl: './home-district-carousel.component.html',
  styleUrl: './home-district-carousel.component.css',
})
export class HomeDistrictCarouselComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  imageService = inject(ImageService);

  shareUrl: string = isPlatformBrowser(this.platformId)
    ? window.location.origin
    : '';

  isQRVisibleMap: { [key: number]: boolean } = {};

  features: any[] = [
    {
      icon: 'fas fa-tree',
      text: 'Lush Forest Trails',
    },
    {
      icon: 'fas fa-water',
      text: 'Crystal Lakes',
    },
    {
      icon: 'fas fa-umbrella-beach',
      text: 'Scenic Valleys',
    },
    {
      icon: 'fas fa-mountain', 
      text: 'Majestic Mountains',
    }
  ];
  

  districts = [
    {
      districtid: 1,
      districtname: 'Gangtok',
      description: "Gangtok, Sikkim's capital, blends culture and stunning views. Explore monasteries, markets, and iconic spots like Nathula Pass and Tsomgo Lake.",
      image: 'assets/Images/districts/gangtok.jpeg',
      population: '100,000+',
      elevation: '5,500 ft',
    },
    {
      districtid: 2,
      districtname: 'Namchi',
      description: "Namchi, a serene town in Sikkim, offers stunning views of Kanchenjunga. Visit the towering Samdruptse Statue and explore peaceful monasteries and landscapes.",
      image: 'assets/Images/districts/namchi.jpg',
      population: '50,000+',
      elevation: '4,500 ft',
    },
    {
      districtid: 4,
      districtname: 'Mangan',
      description: 'Mangan, a tranquil town in North Sikkim, is surrounded by lush greenery and stunning mountain views. A gateway to various trekking routes and natural wonders.',
      image: 'assets/Images/districts/mangan.jpg',
      keyPlaces: [
        'Gurudongmar Lake',
        'Yumthang Valley',
        'Dzongu',
        'Seven Sisters Waterfall',
      ],
      population: '40,000+',
      elevation: '3,950 ft',
    },
    {
      districtid: 5,
      districtname: 'Geyzing',
      description: 'Gyalshing, a peaceful town in West Sikkim, offers beauty and cultural richness. Known for its monasteries, it is a base for treks to places like Pelling and Khangchendzonga.',
      image: 'assets/Images/districts/gyalshing.jpg',
      population: '35,000+',
      elevation: '5,600 ft',
    },
    {
      districtid: 6,
      districtname: 'Pakyong',
      description: 'Pakyong, a district in Sikkim, blends natural beauty with cultural heritage. Known for its airport and educational institutions, it has scenic landscapes and rich biodiversity.',
      image: 'assets/Images/districts/pakyong.jpeg',
      population: '45,000+',
      elevation: '4,600 ft',
    },
    {
      districtid: 3,
      districtname: 'Soreng',
      description: 'Soreng, a peaceful district in Sikkim, is renowned for its natural beauty, lush green valleys, and vibrant cultural heritage. Known for its scenic trails and serene environment.',
      image: 'assets/Images/districts/soreng.jpg',
      population: '30,000+',
      elevation: '6,800 ft',
    },
  ];
  
  popularDestinationofDistrict: any[] = [
    // Gangtok (districtid: 1)
    {
      destinationid: 1,
      districtid: 1,
      destinationname: 'Tsomgo Lake',
    },
    {
      destinationid: 2,
      districtid: 1,
      destinationname: 'Nathula Pass',
    },
    {
      destinationid: 3,
      districtid: 1,
      destinationname: 'MG Marg',
    },
    {
      destinationid: 4,
      districtid: 1,
      destinationname: 'Hanuman Tok',
    },
    // Namchi (districtid: 2)
    {
      destinationid: 5,
      districtid: 2,
      destinationname: 'Samdruptse',
    },
    {
      destinationid: 6,
      districtid: 2,
      destinationname: 'Char Dham',
    },
    {
      destinationid: 7,
      districtid: 2,
      destinationname: 'Tendong Hill',
    },
    {
      destinationid: 8,
      districtid: 2,
      destinationname: 'Ralang Monastery', // Added new destination for Namchi
    },
    // Mangan (districtid: 4)
    {
      destinationid: 12,
      districtid: 4,
      destinationname: 'Yuksom',
    },
    {
      destinationid: 13,
      districtid: 4,
      destinationname: 'Gurudongmar Lake',
    },
    {
      destinationid: 14,
      districtid: 4,
      destinationname: 'Aritar Lake',
    },
    {
      destinationid: 15,
      districtid: 4,
      destinationname: 'Lungthung Valley',
    },
    // Geyzing (districtid: 5)
    {
      destinationid: 16,
      districtid: 5,
      destinationname: 'Zuluk',
    },
    {
      destinationid: 17,
      districtid: 5,
      destinationname: 'Pakyong Airport',
    },
    {
      destinationid: 18,
      districtid: 5,
      destinationname: 'Pemayangtse Monastery',
    },
    {
      destinationid: 19,
      districtid: 5,
      destinationname: 'Khecheopalri Lake',
    },
    // Pakyong (districtid: 6)
    {
      destinationid: 22,
      districtid: 6,
      destinationname: 'Pemayangtse Monastery',
    },
    {
      destinationid: 23,
      districtid: 6,
      destinationname: 'Singshore Bridge',
    },
    {
      destinationid: 24,
      districtid: 6,
      destinationname: 'Pakyong Viewpoint', // Added new destination for Pakyong
    },
    {
      destinationid: 25,
      districtid: 6,
      destinationname: 'Pakyong Airport Viewpoint', // Added new destination for Pakyong
    },
    // Soreng (districtid: 3)
    {
      destinationid: 7,
      districtid: 3,
      destinationname: 'Temi Tea Garden',
    },
    {
      destinationid: 8,
      districtid: 3,
      destinationname: 'Dubdi Monastery',
    },
    {
      destinationid: 9,
      districtid: 3,
      destinationname: 'Kangchendzonga National Park',
    },
    {
      destinationid: 10,
      districtid: 3,
      destinationname: 'Tashiding Monastery',
    },
  ];
  
  

  selectedDistrict: any | null = null;
 
  private apiService = inject(ApiService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.getDistricts();
   // this.getPoularDestinationofDistrict();
  }

  ngAfterViewInit() {
    // Remove alert after testing
    setTimeout(() => {
      initializeOwlCarousel(
        '.district-carousel',
        false,
        true,
        0,
        false,
        [1, 3, 4]
      );
    }, 300);
  }

  
  ngOnDestroy(): void {
      destroyOwlInstance('.district-carousel');
  }

  getDistricts() {
    this.apiService.get('Master/GetAllDistricts').subscribe({
      next: (res: any) => {
        if (res && Array.isArray(res)) {
          // Ensure res is an array before attempting to map
          this.districts = res.map((category: any) => ({
            districtid: category.districtid || null,  // Fallback to null if districtid doesn't exist
            districtname: category.districtname || 'Unknown',  // Default to 'Unknown' if districtname is missing
            description: category.description || '',  // Default to empty string if description is missing
            image: category.image || '',  // Default to empty string if image URL is missing
            keyPlaces: category.keyPlaces || [],  // Default to empty array if keyPlaces is missing
            population: category.population || 0,  // Default to 0 if population is missing
            elevation: category.elevation || 0,  // Default to 0 if elevation is missing
          }));
        } 
      },
      error: (error: any) => {
        console.error('Error fetching districts:', error);
      },
    });
  }
  

  getPoularDestinationofDistrict(){
    this.apiService.get('LandingPage/GetTopMostPopularDistrictWiseDestination').subscribe({
      next:(res:any)=>{
        if(res && Array.isArray(res)){
          this.popularDestinationofDistrict = res.map((category: any) => ({
            destinationid: category.destinationid || null,
            destinationname: category.destinationname || '',
          }));
        }
      }
      ,error:(error:any)=>{
        console.error('Error fetching popular destinations:', error);
      }
    });
  }
  
  getTopDestinationsForDistrictFiltered(districtId: number): any[] {

    const destinations = this.popularDestinationofDistrict.filter(
      place => place.districtid === districtId
     
    );
    return destinations.slice(0, 4); // Only top 4 destinations
  }

  
  switchQR(i: number): void {
    this.isQRVisibleMap[i] = !this.isQRVisibleMap[i];
  }

  shareQR(district: any): void {
    const url = `${this.shareUrl}/destinations/${district.districtname.toLowerCase()}`;
    shareQRCode(
      url,
      `Explore ${district.districtname}`,
      `Check out ${district.districtname} in Sikkim!`
    );
  }

  downloadQR(district: any): void {
    downloadQRCode(district.districtname.toLowerCase());
  }

  trackBy(index: number): number {
    return index;
  }

  getGradientClasses(district: string): string[] {
    return getGradientClasses(district);
  }


  navigateToPlace(place: string): void {
    const formattedPlace = place.toLowerCase().replace(/\s+/g, '-');
      this.router.navigate(['/destination', formattedPlace]);
  
  }






}
