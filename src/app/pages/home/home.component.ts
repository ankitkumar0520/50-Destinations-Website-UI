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
      title: 'Rumtek Monastery',
      description:
        'One of the largest and most significant monasteries in Sikkim, known for its golden stupa and Tibetan architecture.',
      imageUrl:
        'https://static.toiimg.com/photo/msid-56621729,width-96,height-65.cms',
    },
    {
      title: 'Tsomgo Lake',
      description:
        'Glacial lake located at high altitude with stunning mountain views.',
      imageUrl:
        'https://northbengaltourism.com/images/sikkim/tsomgo_changu_lake_1024.jpg',
    },
    {
      title: 'Nathula Pass',
      description:
        'Mountain pass connecting India and China, offering breathtaking Himalayan views.',
      imageUrl:
        'https://melangeoftales.com/wp-content/uploads/2021/01/nathula-pass-scaled.jpeg',
    },
    {
      title: 'Pelling',
      description:
        "Scenic town with spectacular views of Kanchenjunga, the world's third highest mountain.",
      imageUrl:
        'https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/11/shutterstock_377118010.jpg',
    },
    {
      title: 'Yumthang Valley',
      description:
        'Beautiful valley known for its hot springs and colorful rhododendron flowers.',
      imageUrl:
        'https://nomadicweekends.com/blog/wp-content/uploads/2019/02/30127578_1691986214228436_4746460975484370944_o-1.jpg',
    },
    {
      title: 'Gangtok',
      description:
        'The capital city of Sikkim, known for its scenic beauty and monasteries.',
      imageUrl:
        'https://www.adotrip.com/public/images/city/5c3f09faa74cd-Gangtok_Package_Tour.jpg',
    },
    {
      title: 'Lachung',
      description:
        'A beautiful mountain village in North Sikkim, known for its apple orchards and snow-capped peaks.',
      imageUrl:
        'https://www.adotrip.com/public/images/areas/master_images/5e3d0dba837d9-Lachung_Lachen_and_Yumthang_Valley_Attractions.jpg',
    },
    {
      title: 'Ravangla',
      description:
        'A tourist town in South Sikkim known for its scenic beauty, tea gardens, and the Buddha Park.',
      imageUrl:
        'https://1.bp.blogspot.com/-FG-tf_9FDH0/XR8VWVZdopI/AAAAAAAACfQ/WVkTfoJwZeY2wHLX-rnhKxqEnPlKcOU-wCLcBGAs/s1600/buddhapark0101010010101.jpg',
    },
  ];

  activeDestination = this.destinations[0];
}
