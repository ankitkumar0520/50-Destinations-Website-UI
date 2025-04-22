import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, RouterModule],
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
          { name: 'Discover', link: '/' },
          { name: 'Our Story', link: '/about' },
          { name: 'Places to Visit', link: '/destinations' },
          { name: 'Help Center', link: '/faqs' }
        ]        
      },
      {
        title: 'Travel Essentials',
        items: [
          { name: 'Protected Area Permit (PAP)', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/pap' },
          { name: 'Restricted Area Permit (RAP)', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/rap' },
          { name: 'Travel Agents', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/travelagents' },
          { name: 'TICs', link: 'https://sikkimtourism.gov.in/Public/ExploreByMap/Map/TIC' },
        ]
      }
    ]
  };

  contactInfo: {
    address: string;
    phone: string;
    email: string;
     } = {
    address: 'Paryatan Bhawan, Tadong, Gangtok, Sikkim 737101',
    phone: '03592-232218 , 03592-209090',
    email: 'secy_tourism@yahoo.com'
  };

}
