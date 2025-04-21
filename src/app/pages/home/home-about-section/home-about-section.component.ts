import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SearchService } from '../../../services/search.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-about-section.component.html',
  styleUrls: ['./home-about-section.component.css'],
})
export class HomeAboutSectionComponent implements OnInit {
  aboutData: any = {
    title: "Your Gateway to Sikkim's Wonders",
    subtitle:
      'Plan, Explore, and Immerse Yourself in the Land of Serenity and Splendor',
    description:
      "Step into the enchanting world of Sikkim — a Himalayan haven where snow-clad peaks kiss the sky, sacred monasteries resonate with ancient chants, and every valley whispers timeless tales of culture and nature. Nestled in the northeast corner of India, Sikkim is a land of breathtaking contrasts — from the towering majesty of Kanchenjunga to the serene stillness of glacial lakes and lush alpine meadows. Our all-in-one tourism guide is your gateway to exploring all 6 distinctive districts, each offering a unique blend of heritage, adventure, spirituality, and local charm. Immerse yourself in spiritual retreats set in tranquil monasteries, embark on thrilling treks through rhododendron forests and high mountain passes, or experience the warmth of village homestays steeped in tradition. Discover vibrant festivals that light up the hills, savor traditional cuisines, and uncover hidden gems that only the locals know. Whether you're an adventure seeker, a cultural explorer, or a peace-loving soul, Sikkim promises an unforgettable journey through one of India's most captivating and pristine destinations.",
  };

  destinationCategories: any[] = [];
  glanceCounts: any[] = [];
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
    this.getGlanceCounts();
    this.getDestinationCategories();
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
          this.destinationCategories = res.map((category: any) => ({
            id: category.destinationtypeid,
            name: category.destinationtypename,
            icon: category.icon || 'fa-solid fa-circle-question',
          }));
        }
      });
  }
}
