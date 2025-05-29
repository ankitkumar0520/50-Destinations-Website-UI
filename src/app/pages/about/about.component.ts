import { Component, inject, OnInit, HostListener } from '@angular/core';
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
  aboutPageDetails: any;
  projectHighlights: string[] = [];
  districts: any[] = [];
  features: any[] = [];
  activeTab: string = 'about-section';
  navbarHeight = 70;

  aboutTabs = [
    {
      id: 'features-section',
      title: 'Features',
      icon: 'fa-clipboard-list',
      color: 'blue',
    },
    {
      id: 'districts-section',
      title: 'Districts',
      icon: 'fa-map-marker-alt',
      color: 'green',
    },
    {
      id: 'experience-section',
      title: 'Experience',
      icon: 'fa-star',
      color: 'amber',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.getAboutPageDetails();
    this.initializeData();
  }

  getAboutPageDetails() {
    this.apiService.get('LandingPage/GetAboutPageDetails').subscribe({
      next: (res: any) => {
        //handle response here
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private initializeData() {
    this.projectHighlights = [
      'Comprehensive destination information',
      'Interactive maps and guides',
      'Real-time updates and notifications',
      'User-friendly interface',
      'Offline access to essential information',
      'Multilingual support',
    ];

    this.districts = [
      {
        name: 'Gangtok District',
        description: 'Capital city with vibrant urban culture',
      },
      {
        name: 'Pakyong District',
        description: 'Known for airport and scenic views',
      },
      {
        name: 'Namchi District',
        description: 'Spiritual hub with famous religious sites',
      },
      {
        name: 'Gyalshing District',
        description: 'Monasteries, trekking, and peaceful landscapes',
      },
      {
        name: 'Mangan District',
        description: 'Snowy mountains and high-altitude beauty',
      },
      {
        name: 'Soreng District',
        description: 'New district with rural scenic charm',
      },
    ];

    this.features = [
      {
        title: 'Virtual Tours',
        description: 'Explore destinations through immersive 360° views',
        iconClass: 'fa-vr-cardboard',
      },
      {
        title: 'Local Guides',
        description: 'Connect with experienced local guides',
        iconClass: 'fa-user-tie',
      },
      {
        title: 'Travel Tips',
        description: 'Get insider tips and recommendations',
        iconClass: 'fa-lightbulb',
      },
      {
        title: 'Weather Updates',
        description: 'Real-time weather information for planning',
        iconClass: 'fa-cloud-sun',
      },
    ];
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkActiveSection();
  }

  checkActiveSection() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    for (const tab of this.aboutTabs) {
      const element = document.getElementById(tab.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop - this.navbarHeight &&
          scrollPosition < offsetTop + offsetHeight - this.navbarHeight
        ) {
          this.activeTab = tab.id;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - this.navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      this.activeTab = sectionId;
    }
  }
}
