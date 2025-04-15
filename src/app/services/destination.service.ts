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
      touristAttractions: [
        {
          images: [
           'assets/Images/rumtek-monastry/Main-Shrine-Hall-image1.jpg',
           'assets/Images/rumtek-monastry/Main-Shrine-Hall-image2.jpg'
          ],
          imageAlt: 'Main Shrine Hall',
          location: 'Central Courtyard',
          title: 'Main Shrine Hall',
          description: 'Sacred prayer hall adorned with vibrant murals and golden Buddha statues.'
        },
        {
          images: [
             'assets/Images/rumtek-monastry/stupa1.jpg',
             'assets/Images/rumtek-monastry/stupa2.jpg'
          ],
          imageAlt: 'Golden Stupa',
          location: 'Inside the Monastery',
          title: 'Golden Stupa of the 16th Karmapa',
          description: 'A golden relic chamber housing the remains of the 16th Karmapa.'
        },
        {
          images: [
            'assets/Images/rumtek-monastry/wheels1.jpg',
            'assets/Images/rumtek-monastry/wheels2.jpg'
          ],
          imageAlt: 'Prayer Wheels',
          location: 'Monastery Perimeter',
          title: 'Rows of Prayer Wheels',
          description: 'Spin the wheels while walking the kora path for good karma.'
        },
        {
          images: [
            'assets/Images/rumtek-monastry/garden1.jpg',
            'assets/Images/rumtek-monastry/garden2.jpg',
          ],
          imageAlt: 'Meditation Spot',
          location: 'Monastery Garden',
          title: 'Peaceful Courtyard',
          description: 'Open space for silent meditation and reflection.'
        }
      ],
      facilities: [
        {
          id: 'parking',
          title: 'Secure Parking',
          subtitle: 'Convenient Parking',
          description: 'Safe and convenient parking options with 24/7 security and easy access to the main area.',
          image: 'assets/Images/rumtek-monastry/parking.png',
          imageAlt: 'Parking',
          location: 'Main Parking Area',
          distance: '200m from main entrance',
          tags: [
            { text: '24/7 Access', icon: '🕒', color: 'green' },
            { text: 'Secure', icon: '🔒', color: 'yellow' }
          ],
          buttonIcon: '🅿️'
        },
        {
          id: 'taxi',
          title: 'Taxi Services',
          subtitle: 'Easy Transportation',
          description: 'Convenient taxi services available round the clock for all your travel needs.',
          image: 'assets/Images/rumtek-monastry/taxi-stand.png',
          imageAlt: 'Taxi Stand',
          location: 'Main Taxi Stand',
          distance: '100m from main entrance',
          tags: [
            { text: '10am-5pm Service', icon: '🕒', color: 'indigo' },
            { text: 'Multiple Options', icon: '🚗', color: 'green' },
            { text: 'UPI Accepted', icon: '💳', color: 'yellow' }
          ],
          buttonIcon: '🚕'
        },
        {
          id: 'atm',
          title: 'ATM Services',
          subtitle: 'Financial Services',
          description: 'Easy access to cash withdrawal and banking services with multiple ATM options.',
          image: 'assets/Images/rumtek-monastry/ATM.png',
          imageAlt: 'ATM',
          location: 'Main ATM Center',
          distance: '150m from main entrance',
          tags: [
            { text: '24/7 Available', icon: '🕒', color: 'indigo' },
            { text: 'Multiple Banks', icon: '🏦', color: 'green' },
            { text: 'Cash Available', icon: '💵', color: 'yellow' }
          ],
          buttonIcon: '💳'
        }
      ],
      safty:[
        {
          id: 'police-station',
          name: 'Ranipool Police Station',
          description: 'The Ranipool Police Station serves as the primary law enforcement agency for the Ranipool area and its surroundings, including Rumtek Monastery. It operates 24/7, ensuring the safety and security of residents and visitors.',
          distance: '12 kilometers away',
          contact: '03592-251712',
          address: 'Gangtok-Rangpo Road, Upper Tadong, Sikkim, 737135',
          image: 'assets/Images/rumtek-monastry/police-station.jpg',
          type: 'police',
          badge: '24/7 Service'
        },
        {
          id: 'police-booth',
          name: '13th Battalion of the Indo-Tibetan Border Police (ITBP)',
          description: 'The 13th Battalion of ITBP in Lingdum is responsible for border security and engages in various community development programs. They have organized cleanliness drives in nearby areas, including local monasteries, and have participated in plantation drives to promote environmental awareness.',
          distance: 'Approximately 5 kilometers.',
          contact: '011-24368237 or 011-24363940',
          address: '13th Battalion, ITBP Lingdum, East Sikkim, Sikkim',
          image: 'assets/Images/rumtek-monastry/ITBP.jpg',
          type: 'police',
          badge: 'Tourist Help'
        }
      ]
      ,
      healthcare: [
        {
          id: 'hospital',
          name: 'Shyagyong Rumtek Sub-Center',
          description: 'This sub-center is a primary healthcare facility serving the local community in and around Rumtek. It offers basic medical services, including preventive care, maternal and child health services, and treatment for common ailments.',
          distance: 'Approximately 1 kilometer',
          contact: '+91 1122334455',
          address: 'Shyagyong Rumtek Sub-Center, Rumtek, East Sikkim, Sikkim, 737135.',
          image: 'assets/Images/rumtek-monastry/medical-camp.jpg',
          type: 'healthcare',
          badge: 'Temporary Facility'
        },
        {
          id: 'medical-camp',
          name: 'Sir Thutob Namgyal Memorial (STNM) Hospital',
          description: 'STNM Hospital is a multispecialty government hospital offering a wide range of medical services, including emergency care, specialized treatments, and diagnostic services. It serves as a major healthcare facility for residents of Gangtok and surrounding regions.',
          distance: 'Approximately 23 kilometers.',
          contact: '09845562399',
          address: 'NH 31A, Gangtok, East Sikkim, Sikkim, 737101',
          image: 'assets/Images/rumtek-monastry/STMP.jpg',
          type: 'healthcare',
          badge: '24/7 Emergency'
        }
      ],











    };
  }

}
