import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PrivacySection {
  id: string;
  title: string;
  icon: string;
  content: string | string[];
  isList?: boolean;
}

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PrivacyPolicyComponent implements OnInit {
  lastUpdated = 'April 2025';
  introduction = 'Welcome to Sikkim Darshan. We are committed to protecting your privacy while providing you with comprehensive information about Sikkim\'s beautiful destinations.';

  getContentAsArray(content: string | string[]): string[] {
    return Array.isArray(content) ? content : [content];
  }

  privacySections: PrivacySection[] = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: 'fas fa-database',
      isList: true,
      content: [
        'Search preferences (destinations, activities, seasons)',
        'Device information for optimizing your experience',
        'Location data (if permitted) for providing relevant travel information',
        'Usage patterns to improve our destination recommendations'
      ]
    },
    {
      id: 'information-usage',
      title: 'How We Use Your Information',
      icon: 'fas fa-bullseye',
      isList: true,
      content: [
        'Provide accurate destination details and travel information',
        'Customize your browsing experience based on preferences',
        'Improve our destination recommendations and search results',
        'Enhance website performance and user experience',
        'Generate anonymous usage statistics'
      ]
    },
    {
      id: 'location-services',
      title: 'Maps and Location Services',
      icon: 'fas fa-map-marker-alt',
      content: 'Our website uses mapping services to show destination locations and travel routes. When you use these features, the map service provider may collect location data according to their privacy policy. You can disable location services through your browser settings.'
    },
    {
      id: 'cookies',
      title: 'Cookies and Local Storage',
      icon: 'fas fa-cookie-bite',
      isList: true,
      content: [
        'Remember your preferred destinations and searches',
        'Maintain your dark/light mode preference',
        'Improve website performance',
        'Analyze usage patterns'
      ]
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      icon: 'fas fa-link',
      isList: true,
      content: [
        'Mapping services for destination locations',
        'Analytics tools for website improvement',
        'Each third-party service operates under its own privacy policy'
      ]
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: 'fas fa-shield-alt',
      content: 'We implement security measures to protect your information and ensure a safe browsing experience. All data is processed securely and we regularly update our security practices.'
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      icon: 'fas fa-user-shield',
      isList: true,
      content: [
        'Opt out of location services',
        'Clear your browsing data and cookies',
        'Choose your preferred theme (dark/light mode)'
      ]
    },
    {
      id: 'updates',
      title: 'Updates to Privacy Policy',
      icon: 'fas fa-history',
      content: 'We may update this policy as we enhance our website features. Significant changes will be notified through our website. Continued use of our services implies acceptance of the updated policy.'
    }
  ];

  constructor() { }

  ngOnInit() { }
}
