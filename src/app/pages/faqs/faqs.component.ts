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
      iconColor: 'text-blue-500',
      description:
        'Frequently asked questions about destinations, districts, travel, and more.',
      items: [
        {
          id: 'general1',
          question: 'What is this website about?',
          answer:
            "This website showcases 50+ beautiful destinations across Sikkim's different districts, providing detailed information about each location, including attractions, activities, and travel tips.",
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
            'Use the destination page to browse through all destinations. You can click on "View Details" to see information about the destination.',
        },
        {
          id: 'general5',
          question: 'Is this website available in multiple languages?',
          answer:
            'Currently, the website is only available in English, but audio guide in three languages (English, Hindi, and Nepali) is available for all destinations. We plan to add more languages in the future to better serve all visitors to Sikkim.',
        },
        {
          id: 'general6',
          question:
            'Are children and elderly visitors advised to travel to high-altitude areas?',
          answer:
            'It’s recommended to consult a doctor before traveling to high-altitude areas like Gurudongmar or Nathula, especially for young children, elderly travelers, or those with health conditions due to risk of altitude sickness.',
        },
        {
          id: 'general7',
          question:
            'Can I explore destinations on my own or do I need a guide?',
          answer:
            'While many destinations are self-explorable, for protected or remote areas, hiring a registered travel guide or agency is recommended or required.',
        },
        {
          id: 'general8',
          question: 'Is Sikkim safe for solo travelers?',
          answer:
            'Yes, Sikkim is considered one of the safest destinations in India. Police assistance and tourism support are available in most towns and tourist zones.',
        },
        {
          id: 'general9',
          question: 'Are accommodations listed on this website?',
          answer:
            'You can find accommodations on each destination’s page with contact details.',
        },
      ],
    },
    {
      id: 'travel',
      title: 'Travel Information',
      iconColor: 'text-green-500',
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
            'Yes, some areas in Sikkim require special permits. For example, Indian nationals need a permit to visit areas like Lachung and Yumthang Valley. Foreign tourists require a Restricted Area Permit (RAP) to visit certain regions and must travel in groups of two or more through recognized travel agents. Some destinations are restricted for foreign visitors. For detailed information, please refer to the official Sikkim Tourism website.',
        },
        {
          id: 'travel4',
          question: 'What should I pack for a trip to Sikkim?',
          answer:
            'Packing depends on the season. During winters, carry heavy woolens; in monsoons, bring rain gear. Regardless of the season, always carry extra layers as temperatures can drop unexpectedly.',
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
          question: 'Are there local guides available at destinations?',
          answer:
            'While the website does not offer direct booking of guides, many destinations have local guides available. You can connect with registered travel agencies to arrange guided tours.',
        },
        {
          id: 'facilities2',
          question: 'Are there police stations near the destinations?',
          answer:
            'Yes, most tourist destinations have police stations or booths nearby for security. You can find the contact details of the nearest police station on the destination page.',
        },
        {
          id: 'facilities3',
          question: 'Are there parking facilities at the destinations?',
          answer:
            'Most destinations offer secure parking facilities with convenient access to the main attractions. Details about parking, including distance from the main entrance, are provided on individual destination pages.',
        },
        {
          id: 'facilities4',
          question: 'Is mobile network or Wi-Fi available at destinations?',
          answer:
            'Mobile network and internet availability are not guaranteed. Remote locations may have limited or no signal, especially in North and East Sikkim.',
        },
        {
          id: 'facilities5',
          question: 'Are there food or refreshment stalls at the destinations?',
          answer:
            'Most destinations have local food stalls, tea shops, or nearby restaurants. However, remote spots may have limited options, so it’s wise to carry essentials.',
        },
        {
          id: 'facilities6',
          question:
            'Are first aid or emergency services available at tourist spots?',
          answer:
            'Basic healthcare or first-aid support is available in most districts. Emergency contact details are provided on each destination page where applicable.',
        },
        {
          id: 'facilities7',
          question: 'Can I charge my phone or devices at tourist locations?',
          answer:
            'Charging facilities are not commonly available at outdoor spots. It’s best to carry a fully charged power bank during your visit.',
        },
        {
          id: 'facilities8',
          question: 'Are public toilets available at tourist destinations?',
          answer:
            'We no longer highlight public toilets separately. However, most popular tourist spots and surrounding restaurants or lodges have restroom facilities.',
        },
      ],
    },
  ];

  getColorClass(iconColor: string): string {
    const match = iconColor.match(/text-([a-z]+)-/);
    return match ? match[1] : 'primary';
  }

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
