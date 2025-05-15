import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faExclamationTriangle,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <div
      class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
    >
      <div
        class="max-w-md w-full bg-white rounded-xl shadow-md p-10 text-center"
      >
        <div class="text-7xl text-orange-500 mb-4">
          <fa-icon [icon]="faExclamationTriangle"></fa-icon>
        </div>

        <h1 class="text-3xl font-semibold text-gray-800 mb-3">
          Oops! Page Not Found
        </h1>

        <p class="text-gray-600 mb-6">
          We're sorry, but the page you requested could not be found.
        </p>

        <a
          [routerLink]="['/home']"
          class="inline-block px-5 py-3  text-primary-600 hover:bg-primary-50 rounded-md transition-all duration-200 font-medium"
        >
          <fa-icon [icon]="faHome" class="mr-2"></fa-icon>
          Back to Home
        </a>
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
}
