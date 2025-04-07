import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
register();

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements AfterViewInit {
  navigateToDestination(_t15: number) {
    this.router.navigate(['/destination', _t15]);
  }
  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    register();
  }

  ngAfterViewInit(): void {
    // Force change detection
    this.cdr.detectChanges();
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl = document.querySelector('swiper-container');
      if (swiperEl) {
        const swiperParams = {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: true,
          pagination: {
            clickable: true,
          },
        };
        Object.assign(swiperEl, swiperParams);
        swiperEl.initialize();
      }
    }
  }
  destinations = [
    {
      title: 'Dwarka',
      description: 'Ancient kingdom of Lord Krishna on the western coast',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Puri',
      description: 'Famous for Jagannath Temple on the eastern coast',
      imageUrl:
        'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Rameswaram',
      description: 'Sacred Shiva temple in Tamil Nadu',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Dwarka',
      description: 'Ancient kingdom of Lord Krishna on the western coast',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Puri',
      description: 'Famous for Jagannath Temple on the eastern coast',
      imageUrl:
        'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Rameswaram',
      description: 'Sacred Shiva temple in Tamil Nadu',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Dwarka',
      description: 'Ancient kingdom of Lord Krishna on the western coast',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Puri',
      description: 'Famous for Jagannath Temple on the eastern coast',
      imageUrl:
        'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Rameswaram',
      description: 'Sacred Shiva temple in Tamil Nadu',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Dwarka',
      description: 'Ancient kingdom of Lord Krishna on the western coast',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Puri',
      description: 'Famous for Jagannath Temple on the eastern coast',
      imageUrl:
        'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Rameswaram',
      description: 'Sacred Shiva temple in Tamil Nadu',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Dwarka',
      description: 'Ancient kingdom of Lord Krishna on the western coast',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Puri',
      description: 'Famous for Jagannath Temple on the eastern coast',
      imageUrl:
        'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Rameswaram',
      description: 'Sacred Shiva temple in Tamil Nadu',
      imageUrl:
        'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  activeDestination = this.destinations[0];
}
