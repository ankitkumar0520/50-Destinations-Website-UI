import { Routes } from '@angular/router';
import { DestinationMainComponent } from './pages/destination-details/destination-main/destination-main.component';
import { HomeComponent } from './pages/home/home.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'destination/:id', component: DestinationMainComponent }
];
