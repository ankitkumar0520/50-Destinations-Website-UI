import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeMinisterProfileComponent } from '../home-minister-profile/home-minister-profile.component';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeMinisterProfileComponent],
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.css',
})
export class HomeHeroSectionComponent {
  searchQuery: string = '';

  heroData = {
    title: 'Discover Your Next Adventure',
    subtitle: 'Explore 50 breathtaking destinations around the world',
    image: 'assets/Images/Placeholder/bg-new.jpg',
  };

  searchDestinations() {
    console.log('Searching for:', this.searchQuery);
  }
}
