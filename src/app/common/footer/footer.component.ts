import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FooterLink {
  name: string;
  link: string;
  openat: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  items: FooterLink[];
}

interface FooterData {
  year: number;
  websiteName: string;
  tagline: string;
  description: string;
  socialMedia: { url: string, icon: string, color: string }[];
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
    year: new Date().getFullYear(),
    websiteName: 'Sikkim Darshan',
    tagline: 'Sikkim Where Nature Smiles',
    description: 'Discover the beauty of Sikkim through our curated destinations and experiences.',
    socialMedia: [
      { url: 'https://x.com/gtktourismdeptt', icon: 'fa-twitter', color: 'text-blue-500' },
      { url: 'https://www.youtube.com/@tourismcavdepartmentgovern1160', icon: 'fa-youtube', color: 'text-red-500' },
      { url: 'https://www.facebook.com/profile.php?id=100054563433882', icon: 'fa-facebook', color: 'text-blue-700' },
      { url: 'https://www.instagram.com/sikkim.tourism/?hl=en', icon: 'fa-instagram', color: 'text-pink-500' }
    ],
    links: [
      {
        title: 'Quick Links',
        items: [
          { name: 'Discover', link: '/', openat: '_self', isExternal: false },
          { name: 'Our Story', link: '/about', openat: '_self', isExternal: false },
          { name: 'Places to Visit', link: '/destinations', openat: '_self', isExternal: false },
          { name: 'Help Center', link: '/faqs', openat: '_self', isExternal: false }
        ]
      },
      {
        title: 'Travel Essentials',
        items: [
          { name: 'Protected Area Permit (PAP)', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/pap', openat: '_blank', isExternal: true },
          { name: 'Restricted Area Permit (RAP)', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/rap', openat: '_blank', isExternal: true },
          { name: 'Travel Agents', link: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/travelagents', openat: '_blank', isExternal: true },
          { name: 'TICs', link: 'https://sikkimtourism.gov.in/Public/ExploreByMap/Map/TIC', openat: '_blank', isExternal: true },
        ]
      }
    ]
  };

  contactInfo = {
    address: 'Paryatan Bhawan, Tadong, Gangtok, Sikkim 737102',
    phone: '03592-232218 , 03592-209090',
    email: 'secy_tourism@yahoo.com'
  };

  // Method to check if a link is external
  isExternalLink(link: string): boolean {
    return link.startsWith('http://') || link.startsWith('https://');
  }

  // Method to get the appropriate link type
  getLinkType(link: FooterLink): string {
    return link.isExternal ? 'a' : 'routerLink';
  }

  // Method to get the appropriate link attribute
  getLinkAttribute(link: FooterLink): string {
    return link.isExternal ? 'href' : 'routerLink';
  }

  // Method to get the link value
  getLinkValue(link: FooterLink): string {
    return link.isExternal ? link.link : link.link;
  }
}
