import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TermSection {
  id: string;
  title: string;
  icon: string;
  content: string | string[];
  isList?: boolean;
}

@Component({
  selector: 'app-term-services',
  templateUrl: './term-services.component.html',
  styleUrls: ['./term-services.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TermServicesComponent implements OnInit {
  lastUpdated = 'April 2025';
  introduction = 'Welcome to Sikkim Darshan. Please read these terms of service carefully before using our website. By accessing or using our platform, you agree to be bound by these terms.';

  getContentAsArray(content: string | string[]): string[] {
    return Array.isArray(content) ? content : [content];
  }

  termSections: TermSection[] = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: 'fas fa-check-circle',
      content: 'By accessing and using Sikkim Darshan, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our website.'
    },
    {
      id: 'use-license',
      title: 'Use License',
      icon: 'fas fa-key',
      isList: true,
      content: [
        'Information on this website is for personal, non-commercial use only',
        'You may not modify or copy the materials without our explicit permission',
        'You may not use the materials for any commercial purpose',
        'You may not attempt to decompile or reverse engineer any software on our website',
      ]
    },
    {
      id: 'content-accuracy',
      title: 'Content Accuracy',
      icon: 'fas fa-check',
      content: 'While we strive to provide accurate and up-to-date information about destinations, travel routes, accommodations, and facilities in Sikkim, we cannot guarantee the absolute accuracy of all content. Travel conditions, prices, and availability may change without notice.'
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: 'fas fa-user-shield',
      isList: true,
      content: [
        'Verify travel information independently before making plans',
        'Respect local customs and regulations when visiting destinations',
        'Obtain necessary permits and documentation for restricted areas',
        'Follow safety guidelines and weather advisories',
        'Respect the environment and practice responsible tourism'
      ]
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links',
      icon: 'fas fa-external-link-alt',
      content: 'Our website may contain links to third-party websites, including hotels, restaurants, and travel services. We are not responsible for the content or practices of these external sites. Use them at your own discretion.'
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: 'fas fa-copyright',
      isList: true,
      content: [
        'All content on this website is protected by copyright law',
        'Photos, text, and other materials may not be used without permission',
        'User-submitted content remains the property of the respective users'
      ]
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      icon: 'fas fa-exclamation-circle',
      content: 'The information and services on our website are provided "as is" without any warranties, expressed or implied. We do not guarantee the availability of accommodations, activities, or services listed on our platform.'
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: 'fas fa-shield-alt',
      content: 'Sikkim Darshan shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services. This includes but is not limited to travel disruptions, accidents, or losses incurred while using information from our website.'
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      icon: 'fas fa-edit',
      content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified terms.'
    }
  ];

  constructor() { }

  ngOnInit() { }
}
