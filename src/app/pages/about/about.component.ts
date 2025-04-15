import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  features: FeatureItem[] = [
    {
      title: 'Discover Sikkim',
      description: 'Explore the hidden gems of Sikkim, from ancient monasteries to pristine lakes, snow-capped peaks to vibrant festivals.',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Plan Your Trip',
      description: 'Find the perfect destinations, accommodations, and activities for your Sikkim adventure with our curated recommendations.',
      icon: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z'
    },
    {
      title: 'Local Experiences',
      description: 'Immerse yourself in Sikkimese culture with authentic local experiences, traditional cuisine, and community interactions.',
      icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
    }
  ];

  districts = [
    { name: 'Gangtok', description: 'Capital city and cultural hub of East Sikkim' },
    { name: 'Mangan', description: 'Gateway to North Sikkim, known for its pristine landscapes' },
    { name: 'Namchi', description: 'Cultural center of South Sikkim with religious sites' },
    { name: 'Gyalshing', description: 'Administrative center of West Sikkim' },
    { name: 'Pakyong', description: 'Home to Sikkim\'s first airport and scenic valleys' },
    { name: 'Soreng', description: 'Rich in biodiversity and traditional farming practices' }
  ];

  projectHighlights = [
    'Advanced search with filters for districts, experiences, and tags',
    'Detailed destination information with images and descriptions',
    'Comprehensive district-wise categorization',
    'Experience-based destination filtering',
    'Seasonal recommendations and best times to visit',
    'Interactive map integration for location visualization'
  ];
}
