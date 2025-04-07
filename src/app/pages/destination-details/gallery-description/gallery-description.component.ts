import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

interface GalleryImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
}

interface Destination {
  title: string;
  location: string;
  distance: string;
  description: string;
}

@Component({
  selector: 'app-gallery-description',
  standalone: true,
  imports: [CommonModule, GalleriaModule, RadioButtonModule, FormsModule],
  templateUrl: './gallery-description.component.html',
  styleUrls: ['./gallery-description.component.css']
})
export class GalleryDescriptionComponent {
  displayGalleria: boolean = false;
  activeIndex: number = 0;
  imageCount: number = 0;

  // Sample destination data
  destination: Destination = {
    title: 'Rumtek Monastery: The Majestic Seat of the Karmapa',
    location: 'Rumtek, Gangtok,Sikkim 737135, India',
    distance: 'Approx. 24 km from Gangtok, on a hilltop overlooking the Ranipool River',
    description: 'RumtekMonastery also known as the Dharma Chakra Centre is a prominent Buddhist monastery located near Gangtok in Sikkim India Founded in the 16th century by the 9th Karmapa Wangchuk Dorje it serves as the main seat in exile of the Karmapa Lama and is renowned for its stunning architecture and serene surroundings Perched at an elevation of 5 500 feet the monastery is a vital center for Tibetan Buddhism housing sacred relics and offering a glimpse into the rich cultural heritage of the region Visitors are often captivated by its tranquil atmosphere and the breathtaking views of the Himalayas The monastery has a rich history having been originally established in the mid 18th century under the guidance of the 12th Karmapa Changchub Dorje After the 16th Karmapa Rangjung Rigpe Dorje fled Tibet in 1959 he chose to rebuild Rumtek which had fallen into disrepair The reconstruction was completed in 1966 and the monastery became a significant site for the Karma Kagyu lineage symbolizing resilience and continuity of Tibetan Buddhism in exile Today Rumtek Monastery is not only a spiritual hub but also a center of learning with the Karma Shri Nalanda Institute for Higher Buddhist Studies.',
 };

  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 2
    }
  ];

  GalleryImages: GalleryImage[] = [
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/image1.jpg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/image1.jpg',
      alt: 'Monastery View 1'
    },
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/image2.jpg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/image2.jpg',
      alt: 'Monastery View 2'
    },
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/image3.jpg',
        thumbnailImageSrc: 'assets/Images/rumtek-monastry/image3.jpg',
      alt: 'Monastery View 3'
    },
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/image4.jpg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/image4.jpg',
      alt: 'Monastery View 4'
    },
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/image5.jpg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/image5.jpg',
      alt: 'Monastery View 5'
    },
  ];

  constructor() {
    this.imageCount = this.GalleryImages.length;
  }

  showGalleria(index: number): void {
    this.activeIndex = index;
    this.displayGalleria = true;
  }
}
