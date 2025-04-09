import { Routes } from '@angular/router';
import { DestinationMainComponent } from './pages/destination-details/destination-main/destination-main.component';
import { HomeComponent } from './pages/home/home.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { HomeMainComponent } from './pages/home/home-main/home-main.component';
export const routes: Routes = [
  { path: '', component: HomeMainComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'destination/:id', component: DestinationMainComponent }
];
