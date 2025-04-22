import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  title: string;
  iconColor: string;
  description: string;
  background?: string;
  badge?: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FaqsComponent implements OnInit {
  activeAccordion: string | null = null;
  activeQuestion: string | null = null;
  searchTerm: string = '';
  searchResults: FaqItem[] = [];
  isSearching: boolean = false;

  faqCategories: FaqCategory[] = [
    {
      id: 'general',
      title: 'General FAQ',
      iconColor: 'text-amber-500',
      description:
        'Frequently asked questions about destinations, districts, travel, and more.',
      items: [
        {
          id: 'general1',
          question: 'What is this website about?',
          answer:
            "This website showcases 50 beautiful destinations across Sikkim's different districts, providing detailed information about each location, including attractions, activities, and travel tips.",
        },
        {
          id: 'general2',
          question: 'How can I find destinations?',
          answer:
            'You can use our search feature to find destinations by name, district, or type of attraction. You can also browse through our district carousel on the homepage which shows all the districts of Sikkim.',
        },
        {
          id: 'general3',
          question: 'What districts are covered?',
          answer:
            'We cover all districts of Sikkim including Gangtok, Namchi, Geyzing, Mangan, Pakyong, and Soreng, each with their own unique attractions and destinations.',
        },
        {
          id: 'general4',
          question: 'How do I navigate between districts?',
          answer:
            'Use the district carousel on the homepage to browse through all districts. You can click on "Explore [District Name]" to see all destinations in that specific district.',
        },
        {
          id: 'general5',
          question: 'Is this website available in multiple languages?',
          answer:
            'Currently, the website is only available in English, but we plan to add more languages in the future to better serve all visitors to Sikkim.',
        },
      ],
    },
    {
      id: 'travel',
      title: 'Travel Information',
      iconColor: 'text-blue-500',
      description:
        'Information about transportation, travel tips, and getting to destinations.',
      items: [
        {
          id: 'travel1',
          question: 'What is the best time to visit Sikkim?',
          answer:
            'The best time to visit Sikkim varies by district. Generally, spring (March-May) and autumn (September-November) offer pleasant weather across most destinations, perfect for sightseeing and outdoor activities.',
        },
        {
          id: 'travel2',
          question: 'How do I reach Sikkim destinations?',
          answer:
            'The nearest airports are Pakyong Airport (PYG) and Bagdogra Airport (IXB). By train, New Jalpaiguri (NJP) is the closest major railway station. From these points, you can hire taxis to reach various destinations in Sikkim.',
        },
        {
          id: 'travel3',
          question: 'Do I need special permits to visit certain areas?',
          answer:
            'Yes, some areas in Sikkim require special permits, especially in North Sikkim and areas near the international borders. Indian nationals need an Inner Line Permit, while foreign tourists need a Protected Area Permit.',
        },
        {
          id: 'travel4',
          question: 'What transportation options are available within Sikkim?',
          answer:
            'Within Sikkim, you can travel by shared jeeps, private taxis, and local buses. Shared jeeps are the most common mode of public transportation connecting major towns and destinations.',
        },
      ],
    },
    {
      id: 'facilities',
      title: 'Facilities & Amenities',
      iconColor: 'text-amber-500',
      description:
        'Information about facilities, parking, healthcare, and other amenities at destinations.',
      items: [
        {
          id: 'facilities1',
          question: 'What facilities are available at destinations?',
          answer:
            'Most destinations feature facilities like secure parking, restrooms, food stalls or restaurants, and souvenir shops. Specific amenities vary by location and are detailed on each destination page.',
        },
        {
          id: 'facilities2',
          question: 'Is healthcare available at the destinations?',
          answer:
            "Many destinations have nearby healthcare facilities. For example, near Rumtek Monastery, there's the Shyagyong Rumtek Sub-Center which provides basic medical services. Information about nearby healthcare is available on each destination page.",
        },
        {
          id: 'facilities3',
          question: 'Are there police stations near the destinations?',
          answer:
            "Yes, most tourist destinations have police stations or booths nearby for security. For instance, near Rumtek, there's the 13th Battalion of the Indo-Tibetan Border Police (ITBP) which also assists tourists.",
        },
        {
          id: 'facilities4',
          question: 'Are there parking facilities at the destinations?',
          answer:
            'Most destinations offer secure parking facilities with convenient access to the main attractions. Details about parking, including distance from the main entrance, are provided on individual destination pages.',
        },
      ],
    },
  ];

  allFaqItems: FaqItem[] = [];

  constructor() {}

  ngOnInit() {
    // Flatten all FAQ items for search functionality
    this.faqCategories.forEach((category) => {
      this.allFaqItems = [...this.allFaqItems, ...category.items];
    });

    this.activeAccordion = this.faqCategories[0].id;
  }

  toggleAccordion(section: string) {
    if (this.activeAccordion === section) {
      this.activeAccordion = null;
      this.activeQuestion = null;
    } else {
      this.activeAccordion = section;
      // Reset active question when changing sections
      this.activeQuestion = null;
    }
  }

  toggleQuestion(question: string) {
    if (this.activeQuestion === question) {
      this.activeQuestion = null;
    } else {
      this.activeQuestion = question;
    }
  }

  searchFaqs() {
    if (!this.searchTerm.trim()) {
      this.searchResults = [];
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    const term = this.searchTerm.toLowerCase();

    this.searchResults = this.allFaqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchResults = [];
    this.isSearching = false;
  }

  getCategoryById(id: string): FaqCategory | undefined {
    return this.faqCategories.find(
      (category) => category.id === id.split('_')[0]
    );
  }

  getFaIconClass(categoryId: string): string {
    // Map category IDs to Font Awesome icon classes
    const iconMap: { [key: string]: string } = {
      general: 'fa-question-circle',
      travel: 'fa-route',
      facilities: 'fa-concierge-bell',
    };

    return iconMap[categoryId] || 'fa-info-circle'; // Default icon if not found
  }
}
