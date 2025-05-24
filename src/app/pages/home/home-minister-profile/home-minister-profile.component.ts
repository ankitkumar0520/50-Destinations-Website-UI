import {
  Component,
  OnInit,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ImageService } from '../../../services/image.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { register } from 'swiper/element/bundle';

interface Official {
  name: string;
  designation: string;
  fullMessage: string;
  media: any;
}


@Component({
  selector: 'app-home-minister-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-minister-profile.component.html',
  styleUrl: './home-minister-profile.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void <=> *', [animate('200ms ease-out')]),
    ]),
  ],
})
export class HomeMinisterProfileComponent implements OnInit {
  imageService = inject(ImageService);
  selectedMinister: any = null;
  showModal: boolean = false;
  baseUrl = '';

  ministers: Official[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getTestimonials();
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
        if (response.data.length > 0) {
          this.ministers = response.data.map((min: any) => ({
            ...min,
            name: min.name,
            designation: min.designation,
            fullMessage: min.description,
            media: min.media,
          }));
          register(); // Register the swiper element
        }
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
        const minister = this.ministers.find(
          (min: any) => min.name === ministerName
        );

        if (minister) {
          // Pass the whole minister object to the modal
          this.openModal(minister);
        }
      }
    }
  }
}
