import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  destroyOwlInstance,
  initializeOwlCarousel,
} from '../../../utils/utils';

@Component({
  selector: 'app-home-minister-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-minister-profile.component.html',
  styleUrl: './home-minister-profile.component.css',
})
export class HomeMinisterProfileComponent
  implements OnInit, AfterViewInit, OnDestroy
{
   ministers = [
    {
      id: 2,
      name: 'Shri Tshering Thendup Bhutia',
      designation: "Hon'ble Tourism Minister of Sikkim",
      image: 'assets/Images/minister/tshering-thendup.jpg',
      message:
        "This portal reflects our vision of sustainable tourism and world-class experiences. From the majestic Kanchenjunga to serene monasteries and vibrant local life — Sikkim has something for every traveler. We invite you to discover and connect with our beautiful state.",
    },
    {
      id: 1,
      name: 'Shri P. S. Golay',
      designation: "Hon'ble Chief Minister of Sikkim",
      image: 'assets/Images/minister/ps-golay.jpg',
      message:
        "Sikkim is a land of peace, purity, and endless natural beauty. Through this digital platform, we welcome you to explore our traditions, landscapes, and heartfelt hospitality. Let us together celebrate the spirit of Sikkim and elevate it as a global travel destination.",
    },
    {
      id: 3,
      name: 'Shri Sudesh Kumar Subba',
      designation: "Hon'ble Advisor Tourism",
      image: 'assets/Images/minister/sudesh-kumar-subba.jpeg',
      message:
        "Through this website, we aim to offer seamless information and access to Sikkim’s unique offerings. Our focus remains on preserving our environment while opening new avenues for cultural exchange, eco-tourism, and responsible travel.",
    },
  ];
  

  ngOnInit() {
    // Any initialization code
  }

  ngAfterViewInit() {
    // Initialize Owl Carousel
    setTimeout(() => {
      initializeOwlCarousel(
        '.minister-carousel',
        false,
        false,
        0,
        false,
        [1, 1, 3]
      );
    }, 0);
  }

  ngOnDestroy() {
    // Cleanup
    destroyOwlInstance('.minister-carousel');
  }
}
