import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface Product {
  name: string;
  image: string;
  price?: string;
  category?: string;
}

interface Shop {
  name: string;
  address: string;
  image: string;
  products: Product[];
  rating?: number;
  category: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ShopsComponent {
  shops: Shop[] = [
    {
      name: "Heritage Crafts",
      address: "123 Market Street, Near City Center",
      image: "assets/Images/sample-images/shop.jpg",
      category: "Handicrafts",
      rating: 4.5,
      isExpanded: false,
      products: [
        { name: "Handmade Pottery", image: "assets/Images/sample-images/product1.jpg", price: "$25", category: "Pottery" },
        { name: "Traditional Textiles", image: "assets/Images/sample-images/product2.jpg", price: "$45", category: "Textiles" }
      ]
    },
    {
      name: "Artisan's Corner",
      address: "456 Tourist Lane, Main Square",
      image: "assets/Images/sample-images/shop.jpg",
      category: "Art Gallery",
      rating: 4.8,
      isExpanded: false,
      products: [
        { name: "Local Art Prints", image: "assets/Images/sample-images/product1.jpg", price: "$35", category: "Prints" },
        { name: "Cultural Keychains", image: "assets/Images/sample-images/product2.jpg", price: "$15", category: "Souvenirs" }
      ]
    }
  ];

  toggleProducts(shop: Shop) {
    // Close all other shops
    this.shops.forEach(s => {
      if (s !== shop) {
        s.isExpanded = false;
      }
    });
    // Toggle the clicked shop
    shop.isExpanded = !shop.isExpanded;
  }
}
