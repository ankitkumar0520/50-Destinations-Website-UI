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
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-home-minister-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-minister-profile.component.html',
  styleUrl: './home-minister-profile.component.css',
})
export class HomeMinisterProfileComponent implements OnInit, OnDestroy, AfterViewInit {

  imageService = inject(ImageService);
  selectedMinister: any = null;
  showModal: boolean = false;

  ministers: any = [
    {
      name: 'Shri Prem Singh Tamang',
      designation: "Hon'ble Chief Minister of Sikkim",
      description: "With the launch of this QR-enabled tourism platform, we are embracing innovation to enhance how visitors discover Sikkim. It represents our commitment to smart, sustainable, and accessible travel for all.",
      fullMessage: "With the launch of this QR-enabled tourism platform, we are embracing innovation to enhance how visitors discover Sikkim. It represents our commitment to smart, sustainable, and accessible travel for all. Our vision is to make Sikkim a model for sustainable tourism while preserving our rich cultural heritage and natural beauty. This platform will help visitors explore our state in a more organized and meaningful way.",
      image: 'assets/Images/officials/ps-golay.jpg'
    },
    {
      name: 'Shri Tshering Thendup Bhutia',
      designation: 'Hon\'ble Minister',
      description: "This digital tourism system showcases the diversity of Sikkim in the most efficient way. It supports travelers with vital destination insights while preserving our cultural identity.",
      fullMessage: "This digital tourism system showcases the diversity of Sikkim in the most efficient way. It supports travelers with vital destination insights while preserving our cultural identity. We believe in sustainable tourism that benefits both visitors and local communities. Our digital initiatives are designed to provide authentic experiences while maintaining the ecological balance of our beautiful state.",
      image: 'assets/Images/officials/tshering-thendup.jpg'
    },
    {
      name: 'Shri Sudesh Kumar Subba',
      designation: 'Advisor, Tourism Department',
      description: "The QR-based destination platform is a forward-thinking approach to promoting tourism while staying aligned with Sikkim's core values—sustainability, inclusivity, and accessibility.",
      fullMessage: "The QR-based destination platform is a forward-thinking approach to promoting tourism while staying aligned with Sikkim's core values—sustainability, inclusivity, and accessibility. Our goal is to create a seamless experience for tourists while ensuring that our natural resources and cultural heritage are preserved for future generations. This platform represents our commitment to responsible tourism.",
      image: 'assets/Images/officials/sudeshkumarsubba.jpg'
    },
    {
      name: 'C.Subhakar Rao, IFS',
      designation: 'Principal Secretary, Tourism Department',
      description: "This digital tourism system showcases the diversity of Sikkim in the most efficient way. It supports travelers with vital destination insights while preserving our cultural identity.",
      fullMessage: "This digital tourism system showcases the diversity of Sikkim in the most efficient way. It supports travelers with vital destination insights while preserving our cultural identity. We are committed to leveraging technology to enhance the visitor experience while maintaining the authenticity of Sikkim's unique cultural and natural heritage.",
      image: 'assets/Images/officials/cs-rao-min.png'
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Commented out API call , make this uncommented to fetch testimonials from API
    // this.getTestimonials();
  }

  ngAfterViewInit() {
    // Initialize carousel with static data
    setTimeout(() => {
      initializeOwlCarousel(
        '.minister-carousel',
        true,
        true,
        0,
        false,
        [1, 2, 3]
      );
    }, 2000);
  }

  ngOnDestroy() {
    destroyOwlInstance('.minister-carousel');
  }

  openModal(minister: any) {
    this.selectedMinister = minister;
    this.showModal = true;
    document.body.style.overflow = 'hidden'; // Disable scroll
  }

  closeModal() {
    this.showModal = false;
    this.selectedMinister = null;
    document.body.style.overflow = 'auto'; // Enable scroll
  }

  // Commented out API method
  getTestimonials() {
    this.apiService.get('LandingPage/GetAllTestimonials').subscribe({
      next: (response: any) => {
        this.ministers = response;

        setTimeout(() => {
          initializeOwlCarousel(
            '.minister-carousel',
            true,
            true,
            0,
            false,
            [1, 2, 3]
          );
        }, 200);
      },
      error: (error: any) => {
        console.error('Error fetching testimonials:', error);
      },
    });
  }

  handleCarouselClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
  
    // Check if the clicked element is a 'Read More' button
    if (target && target.classList.contains('read-more-btn')) {
      // Get the 'data-id' attribute (minister's name)
      const ministerName = target.getAttribute('data-id');
      
      if (ministerName) {
        // Find the minister object from the list of ministers using the name
        const minister = this.ministers.find((min: any) => min.name === ministerName);
    
        if (minister) {
          // Pass the whole minister object to the modal
          this.openModal(minister);
        }
      }
    }
  }  
  

}
