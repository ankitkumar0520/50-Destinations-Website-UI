import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faExclamationTriangle,
  faHome,
  faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <div
      class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 p-4"
    >
      <div
        class="max-w-md w-full bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-lg p-6 sm:p-8 text-center border border-primary-100 dark:border-primary-700 transform hover:scale-[1.01] transition-all duration-300"
      >
        <div class="flex flex-col items-center">
          <div class="relative mb-6">
            <div class="absolute inset-0 bg-orange-200 dark:bg-orange-900/40 rounded-full blur-md animate-pulse"></div>
            <div class="relative rounded-full bg-orange-100 dark:bg-orange-900/60 p-5">
              <fa-icon [icon]="faExclamationTriangle" class="text-6xl text-orange-500 dark:text-orange-400 animate-bounce"></fa-icon>
            </div>
          </div>

          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Page Not Found
          </h1>
          
          <div class="space-y-2 mb-8">
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              Don't worry! You can explore our beautiful destinations or return home.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 w-full">
            <a
              [routerLink]="['/home']"
              class="flex-1 inline-flex items-center justify-center gap-3 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl shadow-md font-medium text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/25 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <fa-icon [icon]="faHome" class="text-xl"></fa-icon>
              <span>Home</span>
            </a>-
            <a
              [routerLink]="['/destinations']"
              class="flex-1 inline-flex items-center justify-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl shadow-md font-medium text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/25 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <fa-icon [icon]="faMapMarkedAlt" class="text-xl"></fa-icon>
              <span>Destinations</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class NotFoundComponent {
  faExclamationTriangle = faExclamationTriangle;
  faHome = faHome;
  faMapMarkedAlt = faMapMarkedAlt;
}
