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

  ministers: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Any initialization code
    this.getTestimonials();
  }

  ngOnDestroy() {
    // Cleanup
    destroyOwlInstance('.minister-carousel');
  }

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
        }, 100);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching testimonials:', error);
      },
    });
  }
}
