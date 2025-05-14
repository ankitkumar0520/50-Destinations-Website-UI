import { Component, inject, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HomeMinisterProfileComponent } from '../home-minister-profile/home-minister-profile.component';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { ApiService } from '../../../services/api.service';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeMinisterProfileComponent],
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.css',
})
export class HomeHeroSectionComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  filteredDestinations: any[] = [];
  showDropdown = false;
  baseUrl = '';

    // Service worker
  deferredPrompt: any = null;
  private handleBeforeInstallPrompt: ((e: any) => void) | null = null;
  private handleAppInstalled: (() => void) | null = null;
  private cleanupTimeout: any;
  showInstallPopupIos=false;

  private searchTimeout: any;

  private searchService = inject(SearchService);
  private router = inject(Router);
  private apiService = inject(ApiService);
   imageService = inject(ImageService);
  private platformId = inject(PLATFORM_ID);

  snowflakes: Array<{ style: string }> = [];

  heroData = {
    title: "Where Nature Embraces with a Smile",
    subtitle: "Promoting tourism that respects and protects Sikkim’s nature and cultural heritage"
  };
  



  ngOnInit(): void {
    // Generate snowflakes
    this.generateSnowflakes();


    // Check if the app is in standalone mode and is iOS  
    this.isInStandaloneMode();

    // Only run in browser environment
    if (typeof window !== 'undefined' && isPlatformBrowser(this.platformId)) {
      // Handle PWA installation
      this.handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        this.deferredPrompt = e;
      };

      this.handleAppInstalled = () => {
        console.log('App installed');
        this.deferredPrompt = null;
      };

      // Add event listeners
      window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', this.handleAppInstalled);

    }


  }
  

  isInStandaloneMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent); // iOS Safari only
      const isInStandalone = ('standalone' in window.navigator) && (window.navigator as any)['standalone'];
  
      // Show prompt only if it's iOS Safari and NOT already installed
      this.showInstallPopupIos = isIOS && isSafari && !isInStandalone;
    }
  }
  

  ngOnDestroy(): void {
    // Clean up event listeners
    if (typeof window !== 'undefined' && isPlatformBrowser(this.platformId)) {
      if (this.handleBeforeInstallPrompt) {
        window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
      }
      if (this.handleAppInstalled) {
        window.removeEventListener('appinstalled', this.handleAppInstalled);
      }
    }

    // Clear timeout
    if (this.cleanupTimeout) {
      clearTimeout(this.cleanupTimeout);
    }
  }

  private generateSnowflakes() {
    const flakes = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 5 + 3; // Random size between 3px and 8px
      const left = Math.random() * 100; // Random horizontal position
      const animationDuration = Math.random() * 10 + 5; // Random duration between 5s and 15s
      const delay = Math.random() * 5; // Random delay between 0s and 5s
      
      flakes.push({
        style: `
          width: ${size}px;
          height: ${size}px;
          left: ${left}%;
          animation-duration: ${animationDuration}s;
          animation-delay: ${delay}s;
        `
      });
    }
    this.snowflakes = flakes;
  }

  onSearchQueryChange() {
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Set new timeout to debounce API calls
    this.searchTimeout = setTimeout(() => {
      if (this.searchQuery.trim()) {
        const encodedKeyword = encodeURIComponent(this.searchQuery);
        this.apiService
          .get(
            `LandingPage/GetAllDestinationsWithBasicDetailsByNameKeyword?keyword=${encodedKeyword}`
          )
          .subscribe({
            next: (response: any) => {
              this.filteredDestinations = response.map((dest: any) => ({
                name: dest.destinationname,
                image:
                  dest?.media[0]?.mediaurl,
                slug: dest.slug,
              }));
              this.showDropdown = this.filteredDestinations.length > 0;
            },
            error: (error) => {
              console.error('Error fetching destinations:', error);
              this.filteredDestinations = [];
              this.showDropdown = false;
            },
          });
      } else {
        this.filteredDestinations = [];
        this.showDropdown = false;
      }
    }, 300); // 300ms debounce time
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const isInsideDropdown = target.closest('.dropdown');
    const isInputField = target.closest('input');

    if (!isInsideDropdown && !isInputField) {
      this.hideDropdown();
    }
  }

  onDestinationClick(destinationId: string) {
    this.router.navigate([`/destination/${destinationId}`]);
  }

  onInputClick() {
    if (this.searchQuery) {
      this.showDropdown = true;
    }
  }

  hideDropdown() {
    this.showDropdown = false;
  }

  searchDestinations() {
    this.searchService.updateFilters({
      searchtext: this.searchQuery,
    });
    this.redirectToSearch();
  }

  redirectToSearch() {
    this.router.navigate(['/destinations']);
  }

  navigateToHeritageWalk() {
    this.router.navigate(['/heritage-walk']);
  }


  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the installation');
        } else {
          console.log('User dismissed the installation');
        }
        this.deferredPrompt = null; // Clear prompt after it's used
      });
    }
  }


}
