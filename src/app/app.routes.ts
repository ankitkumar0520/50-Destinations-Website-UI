import { Routes } from '@angular/router';
import { DestinationMainComponent } from './pages/destination-details/destination-main.component';
import { SearchMainComponent } from './pages/search/search-main/search-main.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermServicesComponent } from './pages/term-services/term-services.component';
import { EventsComponent } from './pages/events/events.component';
import { HeritageWalkComponent } from './pages/heritage-walk/heritage-walk.component';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // Destination routes
  {
    path: 'destinations',
    children: [
      { path: '', component: SearchMainComponent },
      { path: ':district', component: SearchMainComponent },
    ],
  },
  { path: 'destination/:slug', component: DestinationMainComponent },
  { path: 'destination', redirectTo: 'destinations', pathMatch: 'full' },

  // Other pages
  { path: 'about', component: AboutComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermServicesComponent },
  { path: 'heritage-walk', component: HeritageWalkComponent },
  { path: 'qr-generator', component: QrGeneratorComponent },

  // Wildcard route for 404 page
  { path: '**', component: NotFoundComponent }, // Recommended to add
];
