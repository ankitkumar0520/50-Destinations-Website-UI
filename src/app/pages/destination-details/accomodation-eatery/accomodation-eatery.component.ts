import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Accommodation {
  name: string;
  image: string;
  rating: number;
  price: string;
  address: string;
  contact: string;
  amenities: string[];
  description: string;
}

interface Eatery {
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  priceRange: string;
  address: string;
  contact: string;
  facilities: string[];
  description: string;
}

@Component({
  selector: 'app-accomodation-eatery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accomodation-eatery.component.html',
  styleUrl: './accomodation-eatery.component.css'
})
export class AccomodationEateryComponent {
  accommodations: Accommodation[] = [
    {
      name: "Grand Hotel",
      image: "assets/Images/sample-images/hotel1.jpg",
      rating: 4.5,
      price: "$150/night",
      address: "123 Main Street, City Center, 12345",
      contact: "+1 (555) 123-4567",
      amenities: [
        "Free WiFi",
        "Swimming Pool",
        "Spa & Wellness Center",
        "24/7 Room Service",
        "Restaurant & Bar",
        "Conference Rooms",
        "Fitness Center",
        "Parking Facility",
        "Airport Shuttle",
        "Laundry Service"
      ],
      description: "Luxurious accommodation with modern amenities and excellent service."
    },
    {
      name: "Seaside Resort",
      image: "assets/Images/sample-images/hotel2.jpg",
      rating: 4.8,
      price: "$200/night",
      address: "456 Beach Road, Coastal Area, 23456",
      contact: "+1 (555) 234-5678",
      amenities: [
        "Ocean View Rooms",
        "Private Beach Access",
        "Gym & Yoga Studio",
        "Poolside Bar",
        "Fine Dining Restaurant",
        "Kids Club",
        "Water Sports",
        "Beachfront Spa",
        "Valet Parking",
        "Concierge Service"
      ],
      description: "Stunning beachfront property with breathtaking views."
    },
    {
      name: "Mountain View Lodge",
      image: "assets/Images/sample-images/hotel3.jpg",
      rating: 4.3,
      price: "$120/night",
      address: "789 Hilltop Avenue, Mountain Area, 34567",
      contact: "+1 (555) 345-6789",
      amenities: [
        "Mountain View Rooms",
        "Hiking Trails Access",
        "On-site Restaurant",
        "Spa & Massage",
        "Fireplace Lounge",
        "Outdoor Hot Tub",
        "Bike Rental",
        "Guided Tours",
        "Free Parking",
        "Pet Friendly"
      ],
      description: "Peaceful retreat with panoramic mountain views."
    }
  ];

  eateries: Eatery[] = [
    {
      name: "The Gourmet Kitchen",
      image: "assets/Images/sample-images/restaurant1.jpg",
      rating: 4.7,
      cuisine: "International",
      priceRange: "$$$",
      address: "321 Food Street, Downtown, 12345",
      contact: "+1 (555) 456-7890",
      facilities: [
        "Fine Dining",
        "Wine Cellar",
        "Private Dining Rooms",
        "Outdoor Seating",
        "Live Music",
        "Chef's Table",
        "Catering Service",
        "Valet Parking",
        "Wheelchair Accessible",
        "Reservations Available"
      ],
      description: "Fine dining experience with a diverse menu."
    },
    {
      name: "Seaside Bistro",
      image: "assets/Images/sample-images/restaurant2.jpg",
      rating: 4.4,
      cuisine: "Seafood",
      priceRange: "$$",
      address: "654 Harbor Road, Waterfront, 23456",
      contact: "+1 (555) 567-8901",
      facilities: [
        "Fresh Seafood",
        "Ocean View Dining",
        "Bar & Lounge",
        "Outdoor Terrace",
        "Happy Hour",
        "Takeout Available",
        "Gluten-free Options",
        "Parking Available",
        "Reservations Recommended",
        "Family Friendly"
      ],
      description: "Fresh seafood with ocean views."
    },
    {
      name: "Local Flavors",
      image: "assets/Images/sample-images/restaurant3.jpg",
      rating: 4.6,
      cuisine: "Local",
      priceRange: "$$",
      address: "987 Market Square, Old Town, 34567",
      contact: "+1 (555) 678-9012",
      facilities: [
        "Traditional Cuisine",
        "Local Ingredients",
        "Cooking Classes",
        "Garden Seating",
        "Wine Pairing",
        "Takeout & Delivery",
        "Vegetarian Options",
        "Street Parking",
        "Reservations Available",
        "Cultural Events"
      ],
      description: "Authentic local cuisine in a cozy setting."
    }
  ];
}
