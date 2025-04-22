import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('mobileMenuAnimation', [
      state('closed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
        'padding-top': '0',
        'padding-bottom': '0',
        'margin-bottom': '0'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        'padding-top': '*',
        'padding-bottom': '*'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
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
  @ViewChild('mobileMenuContainer') mobileMenuContainer!: ElementRef;
  @ViewChild('hamburgerButton') hamburgerButton!: ElementRef;

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
    if (this.isSearchOpen) {
      const clickedInsideSearch = this.searchContainer?.nativeElement.contains(event.target);
      const clickedOnSearchButton = this.searchButton?.nativeElement && this.searchButton.nativeElement.contains(event.target);
      if (!clickedInsideSearch && !clickedOnSearchButton) {
        this.isSearchOpen = false;
      }
    }

    if (this.isMobileMenuOpen) {
      const clickedInsideMenu = this.mobileMenuContainer?.nativeElement && this.mobileMenuContainer.nativeElement.contains(event.target);
      const clickedOnHamburger = this.hamburgerButton?.nativeElement && this.hamburgerButton.nativeElement.contains(event.target);

      if (!clickedInsideMenu && !clickedOnHamburger) {
        if (this.mobileMenuContainer && this.hamburgerButton) {
           this.isMobileMenuOpen = false;
        }
      }
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
      'bg-gray-50 dark:bg-gray-900': !this.isScrolled,
      'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg dark:shadow-gray-800/20':
        this.isScrolled,
      'transition-all duration-300 ease-in-out': true,
      'text-gray-900 dark:text-gray-100': true,
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

      this.isScrolled = window.scrollY > 10;
    }
  }
}
