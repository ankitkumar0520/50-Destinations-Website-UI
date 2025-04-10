import { Routes } from '@angular/router';
import { DestinationMainComponent } from './pages/destination-details/destination-main/destination-main.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { HomeMainComponent } from './pages/home/home-main/home-main.component';
import { SearchMainComponent } from './pages/search/search-main/search-main.component';
import { AboutComponent } from './pages/about/about.component';
export const routes: Routes = [
  { path: '', component: HomeMainComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'destination/:id', component: DestinationMainComponent },
  { path: 'search', component: SearchMainComponent },
  {path:'about',component:AboutComponent}
];
