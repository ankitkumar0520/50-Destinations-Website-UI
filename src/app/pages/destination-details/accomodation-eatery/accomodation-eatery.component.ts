import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';

interface Accommodation {
  name: string;
  image: string;
  address: string;
  contact: string;
  facilities: string[];
}

interface Eatery {
  name: string;
  image: string;
  address: string;
  contact: string;
  facilities: string[];
}

@Component({
  selector: 'app-accomodation-eatery',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './accomodation-eatery.component.html',
  styleUrl: './accomodation-eatery.component.css'
})
export class AccomodationEateryComponent {
  selectedHotel: Accommodation | null = null;
  selectedEatery: Eatery | null = null;


  accommodations: Accommodation[] = [
    {
      name: "Sungay Guest House",
      image: "assets/Images/rumtek-monastry/hotel1.jpg",
      address: "Rumtek, Sikkim 737135, India",
      contact: "+91 3592 251 123",
      facilities: [
        "Free WiFi",
        "Complimentary Breakfast",
        "Mountain View Rooms",
        "24/7 Front Desk",
        "Laundry Service",
        "Parking Facility",
        "Room Service",
        "Tour Assistance",
        "Non-Smoking Rooms",
        "Pet Friendly"
      ]
    },
    {
      name: "Treebo Trend D'wang Rumtek Resort",
      image: "assets/Images/rumtek-monastry/hotel2.jpg",
      address: "Near Rumtek Monastery, Rumtek, Sikkim 737135, India",
      contact: "+91 9322 800 100",
      facilities: [
        "Free WiFi",
        "On-site Restaurant",
        "Bar & Lounge",
        "Conference Rooms",
        "Garden Area",
        "24/7 Room Service",
        "Parking Facility",
        "Laundry Service",
        "Airport Shuttle",
        "Wheelchair Accessible"
      ]
    },
    {
      name: "Zharna Waterfall Resort",
      image: "assets/Images/rumtek-monastry/hotel3.jpg",
      address: "Rumtek, Sikkim 737135, India",
      contact: "+91 3592 251 456",
      facilities: [
        "Natural Waterfall On-site",
        "Eco-friendly Cottages",
        "Organic Restaurant",
        "Hiking Trails Access",
        "Spa & Wellness Center",
        "Yoga Sessions",
        "Free Parking",
        "24/7 Front Desk",
        "Room Service",
        "Pet Friendly"
      ]
    }
  ];
  

  eateries: Eatery[] = [
    {
      name: "Dragon Wok",
      image: "assets/Images/rumtek-monastry/eatery1.jpg",
      address: "Near Rumtek Monastery, Rumtek, Sikkim 737135, India",
      contact: "+91 3592 251 789",
      facilities: [
        "Authentic Tibetan Cuisine",
        "Outdoor Seating",
        "Takeaway Available",
        "Free WiFi",
        "Family Friendly",
        "Parking Available",
        "Wheelchair Accessible",
        "Reservations Recommended",
        "Live Music on Weekends",
        "Credit Cards Accepted"
      ]
    },
    {
      name: "Taste of Tibet",
      image: "assets/Images/rumtek-monastry/eatery2.jpg",
      address: "Sang's Retreat, Rumtek, Sikkim 737135, India",
      contact: "+91 3592 251 567",
      facilities: [
        "Traditional Tibetan Dishes",
        "Vegan Options",
        "Cozy Ambience",
        "Free WiFi",
        "Outdoor Seating",
        "Takeaway Available",
        "Parking Facility",
        "Wheelchair Accessible",
        "Reservations Accepted",
        "Cash Only"
      ]
    },
    {
      name: "The Orchid Dining Room",
      image: "assets/Images/rumtek-monastry/eatery3.jpg",
      address: "Mayfair Spa Resort & Casino, Rumtek, Sikkim 737135, India",
      contact: "+91 3592 250 555",
      facilities: [
        "Fine Dining",
        "Multi-Cuisine Menu",
        "Wine Cellar",
        "Private Dining Rooms",
        "Outdoor Seating",
        "Live Music",
        "Valet Parking",
        "Wheelchair Accessible",
        "Reservations Required",
        "Credit Cards Accepted"
      ]
    }
  ];
  

  openHotelModal(hotel: Accommodation) {
    this.selectedHotel = hotel;
    document.body.style.overflow = 'hidden';
  }

  closeHotelModal() {
    this.selectedHotel = null;
    document.body.style.overflow = 'auto';
  }

  openEateryModal(eatery: Eatery) {
    this.selectedEatery = eatery;
    document.body.style.overflow = 'hidden';
  }

  closeEateryModal() {
    this.selectedEatery = null;
    document.body.style.overflow = 'auto';
  }
}
