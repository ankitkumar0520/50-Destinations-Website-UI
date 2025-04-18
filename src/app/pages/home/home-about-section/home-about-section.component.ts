import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { EXPERIENCE_OPTIONS } from '../../../../enums/search-filters.enum';

@Component({
  selector: 'app-home-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-about-section.component.html',
  styleUrl: './home-about-section.component.css',
})
export class HomeAboutSectionComponent {
 private router = inject(Router);
 private searchService =inject(SearchService);

  aboutData = {
    title: "Your Gateway to Sikkim's Wonders",
    subtitle:
      'Plan, Explore, and Immerse Yourself in the Land of Serenity and Splendor',
    description:
      "Step into the enchanting world of Sikkim — a Himalayan haven where snow-clad peaks kiss the sky, sacred monasteries resonate with ancient chants, and every valley whispers timeless tales of culture and nature. Nestled in the northeast corner of India, Sikkim is a land of breathtaking contrasts — from the towering majesty of Kanchenjunga to the serene stillness of glacial lakes and lush alpine meadows. Our all-in-one tourism guide is your gateway to exploring all 6 distinctive districts, each offering a unique blend of heritage, adventure, spirituality, and local charm. Immerse yourself in spiritual retreats set in tranquil monasteries, embark on thrilling treks through rhododendron forests and high mountain passes, or experience the warmth of village homestays steeped in tradition. Discover vibrant festivals that light up the hills, savor traditional cuisines, and uncover hidden gems that only the locals know. Whether you're an adventure seeker, a cultural explorer, or a peace-loving soul, Sikkim promises an unforgettable journey through one of India's most captivating and pristine destinations.",
    categories:EXPERIENCE_OPTIONS,
    stats: [
      { number: '6', label: 'Districts' },
      { number: '50+', label: 'Destinations' },
      { number: '100+', label: 'Monasteries' },
      { number: '4', label: 'Seasons' },
    ],
  };


  setFilter(categorie:any){
      this.searchService.updateFilters({
          experienceType:categorie
      });
      this.navigateToSearch();
  }


  navigateToSearch(){
    this.router.navigate(['/destinations']);
  }


}
