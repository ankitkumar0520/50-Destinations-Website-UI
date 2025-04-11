import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FooterLink {
  name: string;
  link: string;
}

interface FooterSection {
  title: string;
  items: FooterLink[];
}

interface FooterData {
  websiteName: string;
  description: string;
  socialMedia: { url: string }[];
  links: FooterSection[];
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerData: FooterData = {
    websiteName: 'Sikkim Tourism',
    description: 'Discover the beauty of Sikkim through our curated destinations and experiences.',
    socialMedia: [
      { url: 'https://twitter.com/sikkimtourism' },
      { url: 'https://youtube.com/sikkimtourism' },
      { url: 'https://facebook.com/sikkimtourism' },
      { url: 'https://instagram.com/sikkimtourism' }
    ],
    links: [
      {
        title: 'Quick Links',
        items: [
          { name: 'Home', link: '/' },
          { name: 'About', link: '/about' },
          { name: 'Destinations', link: '/destinations' },
          { name: 'Monastery', link: '/none' },
          { name: 'Best Destinations', link: '/best' }
        ]
      },
      {
        title: 'Permits & Services',
        items: [
          { name: 'Sikkim Tourism', link: 'https://sikkimtourism.gov.in/Public/Index' },
          { name: 'Permit', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/pap' },
          { name: 'Travel Agents', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/travelagents' },
          { name: 'Travel Essentials', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials' },
          { name: 'TIC', link: 'https://sikkimtourism.gov.in/Public/ExploreByMap/Map/TIC' }
        ]
      }
    ]
  };
}
