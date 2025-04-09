import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(public router: Router) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  isSearchOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Close search when opening mobile menu
    if (this.isMobileMenuOpen) {
      this.isSearchOpen = false;
    }
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    // Close mobile menu when opening search
    if (this.isSearchOpen) {
      this.isMobileMenuOpen = false;
    }
  }
}
