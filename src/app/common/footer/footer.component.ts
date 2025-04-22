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
  year:number;
  websiteName: string;
  tagline: string;
  description: string;
  socialMedia: { url: string,icon:string,color:string }[];
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
    year:new Date().getFullYear(),
    websiteName: 'Sikkim Darshan',
    tagline:'Sikkim Where Nature Smiles',
    description: 'Discover the beauty of Sikkim through our curated destinations and experiences.',
    socialMedia: [
      { url: 'https://twitter.com/sikkimtourism' ,icon:'fa-twitter',color:'text-blue-500'},
      { url: 'https://youtube.com/sikkimtourism' ,icon:'fa-youtube',color:'text-red-500'},
      { url: 'https://facebook.com/sikkimtourism' ,icon:'fa-facebook',color:'text-blue-700'},
      { url: 'https://instagram.com/sikkimtourism' ,icon:'fa-instagram',color:'text-pink-500'}
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
