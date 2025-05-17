import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { filter } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { register } from 'swiper/element/bundle';


register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  showScrollTop = false;
  private scrollThreshold = 300;

  // Define icon property
  arrowUp = faArrowUp;

  // Show welcome message
  showWelcomeMessage = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  // Add ViewChild for the button
  @ViewChild('scrollToTopButton')
  scrollToTopButton!: ElementRef<HTMLButtonElement>;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showScrollTop = window.scrollY > this.scrollThreshold;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // Blur the button after initiating scroll to remove focus ring
      this.scrollToTopButton?.nativeElement.blur();
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Check if app is in standalone mode (installed as PWA)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        if (!localStorage.getItem('pwaFirstVisit')) {
          this.showWelcomeMessage = true;
          localStorage.setItem('pwaFirstVisit', 'true');
        }
      }
    }
  }
}
