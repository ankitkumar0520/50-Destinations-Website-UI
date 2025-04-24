import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,     FontAwesomeModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        // 👇 Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  showScrollTop = false;
  private scrollThreshold = 300;

  // Define icon property
  arrowUp = faArrowUp;

  // Add ViewChild for the button
  @ViewChild('scrollToTopButton') scrollToTopButton!: ElementRef<HTMLButtonElement>;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.showScrollTop = window.scrollY > this.scrollThreshold;
    }
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // Blur the button after initiating scroll to remove focus ring
      this.scrollToTopButton?.nativeElement.blur();
    }
  }


}
