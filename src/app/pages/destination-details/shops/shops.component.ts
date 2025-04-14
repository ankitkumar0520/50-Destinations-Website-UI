import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';

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
  category: string;
}

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css',
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void <=> *', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class ShopsComponent {
  shops: Shop[] = [
    {
      name: "Rumtek Monastery Souvenir Shop",
      address: "Inside Rumtek Monastery Complex, Rumtek, Sikkim 737135, India",
      image: "assets/Images/rumtek-monastry/shop1.jpg",
      category: "Souvenirs & Religious Items",
      products: [
        { name: "Buddhist Texts", image: "assets/Images/rumtek-monastry/shop1-product1.jpg", price: "₹500 - ₹2,000", category: "Books" },
        { name: "Prayer Flags", image: "assets/Images/rumtek-monastry/shop1-product2.jpg", price: "₹200 - ₹800", category: "Religious Items" },
        { name: "Thangka Paintings",image: "assets/Images/rumtek-monastry/shop1-product3.jpg", price: "₹2,000 - ₹15,000", category: "Art" }
      ]
    },
    {
      name: "Local Handicrafts Stall",
      address: "Near Rumtek Monastery Entrance, Rumtek, Sikkim 737135, India",
      image: "assets/Images/rumtek-monastry/shop2.jpg",
      category: "Traditional Handicrafts",
      products: [
        { name: "Handwoven Woolen Shawls", image: "assets/Images/rumtek-monastry/shop2-product2.jpg", price: "₹1,000 - ₹5,000", category: "Textiles" },
        { name: "Wooden Masks", image: "assets/Images/rumtek-monastry/shop2-product2-1.jpg", price: "₹800 - ₹3,500", category: "Decor" },
        { name: "Bamboo Crafts", image: "assets/Images/rumtek-monastry/shop2-product3.jpg", price: "₹300 - ₹1,500", category: "Crafts" }
      ]
    },
    {
      name: "Sikkimese Handicraft",
      address: "Rumtek, Sikkim 737135, India",
      image: "assets/Images/rumtek-monastry/shop3.jpg",
      category: "Handicrafts & Home Decor",
      products: [
        { name: "Silver Jewelry", image: "assets/Images/rumtek-monastry/shop3-product1.jpg", price: "₹1,000 - ₹7,000", category: "Jewelry" },
        { name: "Puja Statues", image: "assets/Images/rumtek-monastry/shop3-product2.jpg", price: "₹500 - ₹5,000", category: "Religious Items" },
        { name: "Home Decorations", image: "assets/Images/rumtek-monastry/shop3-product3.jpg", price: "₹1,000 - ₹10,000", category: "Decor" }
      ]
    }
  ];
  

  selectedShop: Shop | null = null;
  isModalOpen = false;

  openModal(shop: Shop) {
    this.selectedShop = shop;
    this.isModalOpen = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedShop = null;
    this.isModalOpen = false;
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }
}
