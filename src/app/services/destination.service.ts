import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
 destination:any={};

  constructor() { }

  getDestionation():any{
   return this.destination = {
      name: 'Rumtek Monastery',
      bgimage: 'assets/Images/rumtek-monastry/hero-img.jpg',
      shortdescription: `Rumtek Monastery, also called the Dharma Chakra Centre, is a gompa located in the Indian state of
      Sikkim near the capital Gangtok. It is the seat in exile of the Gyalwang Karmapa, inaugurated in 1966 by the 16th Karmapa.`,
      tags: [
        { icon: 'fas fa-landmark', label: 'Monastery' },
        { icon: 'fas fa-mountain', label: 'Sikkim' },
        { icon: 'fas fa-pray', label: 'Buddhist Temple' },
        { icon: 'fas fa-om', label: 'Religious Site' },
        { icon: 'fas fa-camera', label: 'Tourist Spot' }
      ],
      title: 'Rumtek Monastery: The Majestic Seat of the Karmapa',
      location: 'Rumtek, Gangtok,Sikkim 737135, India',
      distance: 'Approx. 24 km from Gangtok, on a hilltop overlooking the Ranipool River',
      fulldescription: 'RumtekMonastery also known as the Dharma Chakra Centre is a prominent Buddhist monastery located near Gangtok in Sikkim India Founded in the 16th century by the 9th Karmapa Wangchuk Dorje it serves as the main seat in exile of the Karmapa Lama and is renowned for its stunning architecture and serene surroundings Perched at an elevation of 5 500 feet the monastery is a vital center for Tibetan Buddhism housing sacred relics and offering a glimpse into the rich cultural heritage of the region Visitors are often captivated by its tranquil atmosphere and the breathtaking views of the Himalayas The monastery has a rich history having been originally established in the mid 18th century under the guidance of the 12th Karmapa Changchub Dorje After the 16th Karmapa Rangjung Rigpe Dorje fled Tibet in 1959 he chose to rebuild Rumtek which had fallen into disrepair The reconstruction was completed in 1966 and the monastery became a significant site for the Karma Kagyu lineage symbolizing resilience and continuity of Tibetan Buddhism in exile Today Rumtek Monastery is not only a spiritual hub but also a center of learning with the Karma Shri Nalanda Institute for Higher Buddhist Studies.',
      galleryImages: [
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
      ],
      galleryInfo : {
        title: 'Rumtek Monastery Gallery',
        description: 'Explore the stunning architecture and serene beauty of Rumtek Monastery through our curated collection of images. From the majestic main shrine hall to the peaceful monastery gardens, each photograph captures the essence of this spiritual sanctuary.',
      },
  











    };
  }

}
