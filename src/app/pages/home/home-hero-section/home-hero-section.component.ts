import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeMinisterProfileComponent } from '../home-minister-profile/home-minister-profile.component';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';
import { SORT_OPTIONS } from '../../../../enums/search-filters.enum';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeMinisterProfileComponent],
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.css',
})
export class HomeHeroSectionComponent {
  searchQuery: string = '';
  private searchService = inject(SearchService);
  private router  = inject (Router)

  heroData = {
    title: 'Discover Your Next Adventure',
    subtitle: 'Explore 50 breathtaking destinations around the world',
    image: 'assets/Images/Placeholder/bg-new.jpg',
  };

  searchDestinations(){
    this.searchService.updateFilters({
     searchQuery:this.searchQuery
    }); 
    
    this.redirectToSearch();
   }

   searchPopular(){
    this.searchService.updateFilters({
      sort:SORT_OPTIONS[0].id
    });
    this.redirectToSearch();

   }

  redirectToSearch(){
    this.router.navigate(['/destinations']);
  }

}
