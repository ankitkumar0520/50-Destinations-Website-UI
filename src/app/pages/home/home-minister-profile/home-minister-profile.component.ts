import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  destroyOwlInstance,
  initializeOwlCarousel,
} from '../../../utils/utils';
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-home-minister-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-minister-profile.component.html',
  styleUrl: './home-minister-profile.component.css',
})
export class HomeMinisterProfileComponent implements OnInit, OnDestroy {
  imageService = inject(ImageService);

  ministers: any = [
    {
      name: 'Shri Prem Singh Tamang',
      designation: "Hon'ble Chief Minister of Sikkim",
      description: "With the launch of this QR-enabled tourism platform, we are embracing innovation to enhance how visitors discover Sikkim. It represents our commitment to smart, sustainable, and accessible travel for all.",
      image: 'assets/Images/minister/ps-golay.jpg'
    },
    {
      name: 'Shri Tshering Thendup Bhutia',
      designation: 'Hon’ble Minister',
      description: "This digital tourism system showcases the diversity of Sikkim in the most efficient way. It supports travelers with vital destination insights while preserving our cultural identity.",
      image: 'assets/Images/minister/tshering-thendup.jpg'
    },
    {
      name: 'Shri Sudesh Kumar Subba',
      designation: 'Advisor, Tourism Department',
      description: "The QR-based destination platform is a forward-thinking approach to promoting tourism while staying aligned with Sikkim’s core values—sustainability, inclusivity, and accessibility.",
      image: 'assets/Images/minister/sudesh-kumar-subba.jpeg'
    }
  ];
  

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Initialize carousel with static data
    setTimeout(() => {
      initializeOwlCarousel(
        '.minister-carousel',
        false,
        false,
        0,
        false,
        [1, 1, 3]
      );
    }, 200);
    
    // Commented out API call
    // this.getTestimonials();
  }

  ngOnDestroy() {
    destroyOwlInstance('.minister-carousel');
  }

  // Commented out API method
  /*
  getTestimonials() {
    this.apiService.get('LandingPage/GetAllTestimonials').subscribe({
      next: (response: any) => {
        this.ministers = response;

        setTimeout(() => {
          initializeOwlCarousel(
            '.minister-carousel',
            false,
            false,
            0,
            false,
            [1, 1, 3]
          );
        }, 200);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching testimonials:', error);
      },
    });
  }
  */
}
