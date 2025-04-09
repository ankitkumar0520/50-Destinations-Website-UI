import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-about-section.component.html',
  styleUrl: './home-about-section.component.css'
})
export class HomeAboutSectionComponent {
  aboutData = {
    title: "Your Gateway to Sikkim's Wonders",
    subtitle: "Plan, Explore, and Immerse Yourself in the Land of Serenity and Splendor",
    description: "Step into the enchanting world of Sikkim — a Himalayan haven where snow-clad peaks kiss the sky, sacred monasteries resonate with ancient chants, and every valley whispers timeless tales of culture and nature. Nestled in the northeast corner of India, Sikkim is a land of breathtaking contrasts — from the towering majesty of Kanchenjunga to the serene stillness of glacial lakes and lush alpine meadows. Our all-in-one tourism guide is your gateway to exploring all 6 distinctive districts, each offering a unique blend of heritage, adventure, spirituality, and local charm. Immerse yourself in spiritual retreats set in tranquil monasteries, embark on thrilling treks through rhododendron forests and high mountain passes, or experience the warmth of village homestays steeped in tradition. Discover vibrant festivals that light up the hills, savor traditional cuisines, and uncover hidden gems that only the locals know. Whether you're an adventure seeker, a cultural explorer, or a peace-loving soul, Sikkim promises an unforgettable journey through one of India's most captivating and pristine destinations.",
      categories: [
      { name: "Tourism Guide", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { name: "Local Experiences", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
      { name: "Cultural Heritage", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
      { name: "Adventure", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
      { name: "Nature & Wildlife", icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" },
      { name: "Festivals & Events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }    
    ],
    stats: [
      { number: "6", label: "Districts" },
      { number: "50+", label: "Destinations" },
      { number: "100+", label: "Monasteries" },
      { number: "4", label: "Seasons" }
    ]
  };
}
