import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface FeatureItem {
  title: string;
  description: string;
  iconClass: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  apiService = inject(ApiService);
  ngOnInit(): void {
    this.getAboutPageDetails();
  }

  aboutPageDetails: any;
  getAboutPageDetails() {
    this.apiService
      .get('LandingPage/GetAboutPageDetails')
      .subscribe({
        next:(res:any)=>{
          //handle response here
        },
        error:(err:any)=>{
          console.log(err);
        }
      });
  }

  features: FeatureItem[] = [
    {
      title: 'Discover Sikkim',
      description:
        'Explore the hidden gems of Sikkim, from ancient monasteries to pristine lakes, snow-capped peaks to vibrant festivals.',
      iconClass: 'fa-globe-asia',
    },
    {
      title: 'Plan Your Trip',
      description:
        'Find the perfect destinations, accommodations, and activities for your Sikkim adventure with our curated recommendations.',
      iconClass: 'fa-map-marked-alt',
    },
    {
      title: 'Local Experiences',
      description:
        'Immerse yourself in Sikkimese culture with authentic local experiences, traditional cuisine, and community interactions.',
      iconClass: 'fa-users',
    },
    {
      title: 'Travel Guides',
      description:
        'Access comprehensive travel guides with insider tips, seasonal information, and cultural insights for an enriched journey.',
      iconClass: 'fa-book-open',
    },
  ];

  districts = [
    {
      name: 'Gangtok',
      description: 'Capital city and cultural hub of East Sikkim',
    },
    {
      name: 'Mangan',
      description: 'Gateway to North Sikkim, known for its pristine landscapes',
    },
    {
      name: 'Namchi',
      description: 'Cultural center of South Sikkim with religious sites',
    },
    { name: 'Gyalshing', description: 'Administrative center of West Sikkim' },
    {
      name: 'Pakyong',
      description: "Home to Sikkim's first airport and scenic valleys",
    },
    {
      name: 'Soreng',
      description: 'Rich in biodiversity and traditional farming practices',
    },
  ];

  projectHighlights = [
    'Advanced search with filters for districts, experiences, and tags',
    'Detailed destination information with images and descriptions',
    'Comprehensive district-wise categorization',
    'Experience-based destination filtering',
    'Seasonal recommendations and best times to visit',
    'Interactive map integration for location visualization',
  ];
}
