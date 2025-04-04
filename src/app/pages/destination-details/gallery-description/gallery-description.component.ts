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
  name: string;
  location: string;
  bestTimeToVisit: string;
  description: string;
  highlights: string[];
  activities: string[];
  gettingThere: string;
  accommodation: string;
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

  // Sample destination data
  destination: Destination = {
    name: 'Monastery of Tigers Nest',
    location: 'Paro, Bhutan',
    bestTimeToVisit: 'March to May, September to November',
    description: 'Paro Taktsang, also known as the Tiger\'s Nest Monastery, is a sacred Buddhist site located in the cliffside of the upper Paro valley in Bhutan. This stunning monastery is one of Bhutan\'s most iconic landmarks, built in 1692 around the Taktsang Senge Samdup cave where Guru Padmasambhava is said to have meditated for three years, three months, three weeks, three days and three hours in the 8th century.',
    highlights: [
      'Iconic cliffside monastery',
      'Sacred Buddhist pilgrimage site',
      'Stunning mountain views',
      'Rich cultural heritage',
      'Ancient architecture'
    ],
    activities: [
      'Hiking to the monastery',
      'Photography',
      'Meditation',
      'Cultural tours',
      'Local guide experiences'
    ],
    gettingThere: 'The monastery is accessible via a 4-5 hour round trip hike from the Paro Valley. The trail is well-maintained but steep, with an option to ride a horse for the first part.',
    accommodation: 'Various hotels and resorts are available in Paro town, ranging from luxury hotels to traditional Bhutanese guesthouses.'
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
      itemImageSrc: 'https://images.unsplash.com/photo-1514539079130-25950c84af65',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=500',
      alt: 'Monastery View 1'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=500',
      alt: 'Monastery View 2'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1623857584158-23c769acb3c5',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1623857584158-23c769acb3c5?w=500',
      alt: 'Monastery View 3'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?w=500',
      alt: 'Monastery View 4'
    },
   
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=500',
      alt: 'Monastery View 6'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500',
      alt: 'Monastery View 7'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=500',
      alt: 'Monastery View 8'
    }
  ];

  showGalleria(index: number): void {
    this.activeIndex = index;
    this.displayGalleria = true;
  }
}
