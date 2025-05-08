import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SearchService } from '../../../services/search.service';
import { ApiService } from '../../../services/api.service';
import {
  EXPERIENCE_OPTIONS,} from '../../../../enums/search-filters.enum';
import { DestinationService } from '../../../services/destination.service';
@Component({
  selector: 'app-home-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-about-section.component.html',
  styleUrls: ['./home-about-section.component.css'],
})
export class HomeAboutSectionComponent implements OnInit {

  destinationService = inject(DestinationService);

  aboutData: any = {
    title: "Unlock the <span class='text-secondary-800'>Wonders</span> of Sikkim",
    subtitle: "Journey Through Serenity, Adventure, and Timeless Beauty",
    description: `<b>Welcome to Sikkim</b> — a Himalayan paradise where snow-capped peaks touch the heavens, ancient monasteries echo with sacred chants, and every valley weaves a story of timeless beauty. Nestled in the heart of Northeast India, Sikkim is a land of awe-inspiring contrasts — from the towering splendor of Kanchenjunga to the serene reflections of glacial lakes and the vibrant blooms of alpine meadows. 
  
  Discover the soul of Sikkim across its six unique districts, each offering a mesmerizing blend of heritage, spirituality, adventure, and local warmth. Embark on thrilling treks through misty rhododendron forests, find peace within centuries-old monasteries, or savor the charm of village life through authentic homestays. Witness colorful festivals that light up the mountains, indulge in traditional flavors, and uncover hidden gems known only to locals.
  
  Whether you're an adventurer, a culture seeker, or a soul in search of tranquility, Sikkim invites you on an unforgettable journey into one of India's most pristine and magical destinations. Let your story begin here.`
  };
  

  experienceOptions=EXPERIENCE_OPTIONS;

  glanceCounts: any[] = [
    { number: 6, label: 'Districts' },
    { number: this.destinationService.getAllDestinations().length, label: 'Destinations' },
    { number: 15, label: 'Experience Types' },
    { number: 4, label: 'Seasons' }
  ];

  displayedCounts: number[] = [0, 0, 0, 0]; // For animation
  private animationDuration = 2000; // Duration in milliseconds
  private animationFrameRate = 60; // Frames per second

  private router = inject(Router);
  private searchService = inject(SearchService);
  private apiService = inject(ApiService);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Start animation with static data
    if (this.isBrowser) {
      this.startCountAnimation();
    }
    // Commented out API calls
    //this.getGlanceCounts();
    // this.getDestinationCategories();
  }

  setFilter(categorie: any) {
    this.searchService.updateFilters({
      experienceType: categorie,
    });
    this.navigateToSearch();
  }

  navigateToSearch() {
    this.router.navigate(['/destinations']);
  }

  // Commented out API method
  
  getGlanceCounts() {
    this.apiService.get('LandingPage/GetGlance').subscribe((res: any) => {
      if (res) {
        this.glanceCounts = [
          { number: res.districtcount, label: 'Districts' },
          { number: res.destinationcount, label: 'Destinations' },
          { number: res.destinationtypecount, label: 'Destination Types' },
          { number: res.seasoncount, label: 'Seasons' },
        ];
        if (this.isBrowser) {
          this.startCountAnimation();
        }
      }
    });
  }

  private startCountAnimation() {
    const targetValues = this.glanceCounts.map((count) => count.number);
    const steps = Math.ceil(
      this.animationDuration / (1000 / this.animationFrameRate)
    );
    const incrementValues = targetValues.map((value) => value / steps);
    let currentStep = 0;

    const animate = () => {
      if (currentStep < steps) {
        this.displayedCounts = this.displayedCounts.map((count, index) => {
          const newValue = Math.min(
            count + incrementValues[index],
            targetValues[index]
          );
          return Math.ceil(newValue);
        });
        currentStep++;
        if (this.isBrowser) {
          requestAnimationFrame(animate);
        }
      }
    };

    animate();
  }


  getDestinationCategories() {
    this.apiService
      .get('Master/GetAllDestinationTypes')
      .subscribe((res: any) => {
        if (res) {
          this.experienceOptions = res;
        }
      });
  }
  

}
