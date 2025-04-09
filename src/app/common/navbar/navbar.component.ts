import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('searchButton') searchButton!: ElementRef;

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
}
