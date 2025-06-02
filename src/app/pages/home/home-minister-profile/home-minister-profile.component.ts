import {
  Component,
  OnInit,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ImageService } from '../../../services/image.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

interface Official {
  name: string;
  designation: string;
  fullMessage: string;
  media: any;
  imageLoaded?: boolean;
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
    trigger('fadeIn', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('500ms ease-in')),
    ]),
  ],
})
export class HomeMinisterProfileComponent implements OnInit {
  imageService = inject(ImageService);
  selectedMinister: any = null;
  showModal: boolean = false;
  baseUrl = '';
  isLoading: boolean = true;
  isSwiperReady: boolean = false;

  ministers: Official[] = [];

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.getTestimonials();
    if (this.isBrowser()) {
      customElements.whenDefined('swiper-container').then(() => {
        this.isSwiperReady = true;
      });
    }
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  openModal(minister: any) {
    this.selectedMinister = minister;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.selectedMinister = null;
    document.body.style.overflow = 'auto';
  }

  getTestimonials() {
    this.isLoading = true;
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
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching testimonials:', error);
        this.isLoading = false;
      },
    });
  }
}
