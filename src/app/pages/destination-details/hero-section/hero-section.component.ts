import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShareQRModelComponent } from '../share-qr-model/share-qr-model.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports: [CommonModule,ShareQRModelComponent]
})
export class HeroSectionComponent implements OnInit {
  isMenuOpen = false;

  showModal = false;
  shareUrl = 'https://your-link.com'; // Provide actual link

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
