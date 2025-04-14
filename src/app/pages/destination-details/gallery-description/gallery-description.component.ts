import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { destroyOwlInstance, initializeOwlCarousel } from '../../../utils/utils';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';

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
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './gallery-description.component.html',
  styleUrls: ['./gallery-description.component.css']
})
export class GalleryDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
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

  GalleryImages: GalleryImage[] = [
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/rumtek1.jpeg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/rumtek1.jpeg',
      alt: 'Rumtek Monastery Main View'
    },
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/rumtek2.jpeg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/rumtek2.jpeg',
      alt: 'Main Shrine Hall'
    },
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/rumtek3.jpeg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/rumtek3.jpeg',
      alt: 'Main Shrine Hall Interior'
    },
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/rumtek4.jpeg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/rumtek4.jpeg',
      alt: 'Monastery Stupa'
    },
    {
      itemImageSrc: 'assets/Images/rumtek-monastry/rumtek5.jpeg',
      thumbnailImageSrc: 'assets/Images/rumtek-monastry/rumtek5.jpeg',
      alt: 'Monastery Garden'
    }
  ];

  galleryInfo = {
    title: 'Rumtek Monastery Gallery',
    description: 'Explore the stunning architecture and serene beauty of Rumtek Monastery through our curated collection of images. From the majestic main shrine hall to the peaceful monastery gardens, each photograph captures the essence of this spiritual sanctuary.',
    totalImages: 5
  };

  constructor() {
    this.imageCount = this.GalleryImages.length;
  }

  ngOnInit(): void {
    // Initialization logic can be added here
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      initializeOwlCarousel(
        '.destination-gallery-carousel',
        false,
        true,
        5,
        false,
        [1,3,4],
        true
      );
    }, 300);
  }

  ngOnDestroy(): void {
    destroyOwlInstance('.destination-gallery-carousel');
  }

  showGalleria(index: number): void {
    this.activeIndex = index;
    this.displayGalleria = true;
  }
}
