import { Routes } from '@angular/router';
import { DestinationMainComponent } from './pages/destination-details/destination-main/destination-main.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'destination/:id', component: DestinationMainComponent },
];
