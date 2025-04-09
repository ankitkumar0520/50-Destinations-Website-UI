import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { destroyOwlInstance, initializeOwlCarousel } from '../../../utils/utils';

@Component({
  selector: 'app-home-minister-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-minister-profile.component.html',
  styleUrl: './home-minister-profile.component.css'
})
export class HomeMinisterProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  ministers = [
    {
      id: 1,
      name: 'Shri P. S. Golay',
      designation: 'Hon\'ble Chief Minister of Sikkim',
      image: 'assets/Images/minister/ps-golay.jpg',
      message: 'Let us join this mass movement towards Surajya, realize the hopes and aspirations of the people and take India to greater heights! Together we can build a stronger, more prosperous nation for all.'
    },
    {
      id: 2,
      name: 'Shri Tshering Thendup Bhutia',
      designation: 'Hon\'ble Tourism Minister',
      image: 'assets/Images/minister/tshering-thendup.jpg',
      message: 'Our focus is on developing world-class tourism infrastructure and promoting India as a premier travel destination. We invite you to explore the incredible diversity of our nation.'
    },
    {
      id: 3,
      name: 'Shri Sudesh Kumar Subba',
      designation: 'Hon\'ble Advisor Tourism',
      image: 'assets/Images/minister/sudesh-subba.jpg',
      message: 'India\'s rich cultural heritage and diverse landscapes offer unique experiences to travelers. We are committed to showcasing our nation\'s treasures to the world while promoting sustainable tourism.'
    }
   
  ];

  ngOnInit() {
    // Any initialization code
  }

  ngAfterViewInit() {
    // Initialize Owl Carousel
    setTimeout(() => {
      initializeOwlCarousel('.minister-carousel', true, true, 0, false, [1,1,1]);
    }, 300);
  }

  ngOnDestroy() {
    // Cleanup
    destroyOwlInstance('.minister-carousel');
  }
}
