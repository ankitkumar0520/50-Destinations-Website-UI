import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isSearchOpen = false;
  isScrolled = false;
  isDarkMode = false;

  constructor(
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('searchButton') searchButton!: ElementRef;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isSearchOpen = false;
    }
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.isSearchOpen) return;

    const clickedInsideSearch = this.searchContainer?.nativeElement.contains(
      event.target
    );
    const clickedOnButton = this.searchButton?.nativeElement.contains(
      event.target
    );

    if (!clickedInsideSearch && !clickedOnButton) {
      this.isSearchOpen = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 10;
    }
  }

  get navClasses() {
    return {
      // Light mode classes
      'bg-gray-50 dark:bg-gray-900': !this.isScrolled,
      'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg dark:shadow-gray-800/20':
        this.isScrolled,

      // Transition effects
      'transition-all duration-300 ease-in-out': true,

      // Dark mode text colors
      'text-gray-900 dark:text-gray-100': true,

      // Additional dark mode considerations
      'border-b border-gray-200 dark:border-gray-700': this.isScrolled,
    };
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle('dark', this.isDarkMode);
      localStorage.setItem('darkMode', this.isDarkMode.toString());
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isSystemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const savedMode = localStorage.getItem('darkMode');

      this.isDarkMode = savedMode ? savedMode === 'true' : isSystemDark;
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    }
  }
}
