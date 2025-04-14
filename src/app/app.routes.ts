import { Routes } from '@angular/router';
import { DestinationMainComponent } from './pages/destination-details/destination-main.component';
import { SearchMainComponent } from './pages/search/search-main/search-main.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch:'full' },
  { path: 'destinations', component: SearchMainComponent },
  { path: 'destination/:id', component: DestinationMainComponent },
  { path: 'about', component: AboutComponent },
];
