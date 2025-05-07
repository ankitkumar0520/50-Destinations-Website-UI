import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private destinationSubject = new BehaviorSubject<any>(null);
  destination$ = this.destinationSubject.asObservable();


  getDestinationBySlug(slug: string) {
    const destination = this.getLocalDestinationBySlug(slug);
    if (destination) {
      this.destinationSubject.next(destination);
    }
  }
  
   getLocalDestinationBySlug(slug: string): any {
    // Check all local destination objects


    // Find the destination that matches the slug
    return this.destinations.find(dest => dest.slug === slug);
  }




  rumtekMonastery={

    name: 'Rumtek Monastery',
    slug: 'rumtek-monastery',
    shortdescription: `Rumtek Monastery, also called the Dharma Chakra Centre, is a gompa located in the Indian state of
    Sikkim near the capital Gangtok. It is the seat in exile of the Gyalwang Karmapa, inaugurated in 1966 by the 16th Karmapa.`,
    tags: [
      { label: 'Monastery' },
      { label: 'Sikkim' },
      {  label: 'Buddhist Temple' },
      { label: 'Religious Site' },
      { label: 'Tourist Spot' }
    ],
    districtname: 'Gangtok',
    title: 'Rumtek Monastery: The Majestic Seat of the Karmapa',
    location: 'Rumtek, Gangtok,Sikkim 737135, India',
    distance: 'Approx. 24 km from Gangtok, on a hilltop overlooking the Ranipool River',
    fulldescription: 'RumtekMonastery also known as the Dharma Chakra Centre is a prominent Buddhist monastery located near Gangtok in Sikkim India Founded in the 16th century by the 9th Karmapa Wangchuk Dorje it serves as the main seat in exile of the Karmapa Lama and is renowned for its stunning architecture and serene surroundings Perched at an elevation of 5 500 feet the monastery is a vital center for Tibetan Buddhism housing sacred relics and offering a glimpse into the rich cultural heritage of the region Visitors are often captivated by its tranquil atmosphere and the breathtaking views of the Himalayas The monastery has a rich history having been originally established in the mid 18th century under the guidance of the 12th Karmapa Changchub Dorje After the 16th Karmapa Rangjung Rigpe Dorje fled Tibet in 1959 he chose to rebuild Rumtek which had fallen into disrepair The reconstruction was completed in 1966 and the monastery became a significant site for the Karma Kagyu lineage symbolizing resilience and continuity of Tibetan Buddhism in exile Today Rumtek Monastery is not only a spiritual hub but also a center of learning with the Karma Shri Nalanda Institute for Higher Buddhist Studies.',
    duration: '2-3 hours',
    popularityCount: 78,
    seasons: ['all'],
    addedOn: '2025-02-15T14:15:00Z',
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
          { text: '24/7 Access' },
          { text: 'Secure' }
        ],
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
          { text: '10am-5pm Service'   },
          { text: 'Multiple Options' },
          { text: 'UPI Accepted' }
        ],
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
          { text: '24/7 Available' },
          { text: 'Multiple Banks'},
          { text: 'Cash Available'}
        ],
      }
    ],
    safety:[
      {
        id: 'police-station',
        name: 'Ranipool Police Station',
        description: 'The Ranipool Police Station serves as the primary law enforcement agency for the Ranipool area and its surroundings, including Rumtek Monastery. It operates 24/7, ensuring the safety and security of residents and visitors.',
        distance: '12 kilometers away',
        contact: '03592-251712',
        address: 'Gangtok-Rangpo Road, Upper Tadong, Sikkim, 737135',
        location:{
          lat:'27.2938408324907',
          long:'88.59079916640482'
         },
        image: 'assets/Images/rumtek-monastry/police-station.jpg',
        badge: '24/7 Service'

      },
      {
        id: 'police-booth',
        name: '13th Battalion of the Indo-Tibetan Border Police (ITBP)',
        description: 'The 13th Battalion of ITBP in Lingdum is responsible for border security and engages in various community development programs. They have organized cleanliness drives in nearby areas, including local monasteries, and have participated in plantation drives to promote environmental awareness.',
        distance: 'Approximately 5 kilometers.',
        contact: '011-24368237 or 011-24363940',
        address: '13th Battalion, ITBP Lingdum, East Sikkim, Sikkim',
        location:{
          lat:'ttfv',
          long:''
         },
        image: 'assets/Images/rumtek-monastry/ITBP.jpg',
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
        location:{
          lat:'ttfv',
          long:''
         },
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
        location:{
          lat:'27.34612900371686',
          long:'88.60424004920918'
         },
        image: 'assets/Images/rumtek-monastry/STMP.jpg',
        type: 'healthcare',
        badge: '24/7 Emergency'
      }
    ],
    shops: [
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
    ],
    accommodations:[
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
    ],
    
eateries: [
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
],
travelInfo :{
  transportModes: [
    {
     
      title: "By Air",
      description: "The nearest airport to Rumtek Monastery is Pakyong Airport (PYG), located about 35 km away. Another option is Bagdogra Airport (IXB), about 125 km away."
    },
    {

      title: "By Train",
      description: "The nearest major railway station is New Jalpaiguri (NJP), about 120 km from Gangtok. From there, you can hire a taxi to reach Rumtek."
    },
    {

      title: "By Road",
      description: "Rumtek is located around 23 km from Gangtok. You can hire taxis or take shared cabs from Gangtok. The roads are hilly and scenic, offering a beautiful journey."
    }

  ],
  latitude:'27.305827',
  longitude:'88.53637'
}

  };

  tareyBhir={
    name: 'Tarey Bhir',
    slug: 'tarey-bhir',
    location: 'Tarey Bhir,Namchi ,Sikkim, India',
    distance: 'Approx. 16.3 km km from Namchi',
    shortdescription: `Tarey Bhir is an area surrounding a hill that was once part of an ancient trade route connecting Sikkim to other regions of India and neighboring countries. It is considered a sacred site by the local community, with various legends and myths associated with it.`,
    fulldescription:'Perched dramatically above South Sikkim’s lush valleys, Tarey Bhir (meaning "cliff" in Nepali) is a breathtaking 3km razor-edge ridge where sheer drops meet endless skies. This natural wonder was once part of an ancient Himalayan trade route, its windswept trails trodden by merchants, monks, and pilgrims. Steeped in local legend, the cliffs are said to be guarded by spirits, with whispers of hidden caves and divine blessings lingering in the mountain air. Today, adventurers trek its narrow spine for heart-stopping views—the Teesta River glinting far below, emerald valleys unfolding endlessly, and the snow-crowned peaks of Kanchenjunga blazing in the distance. More than a viewpoint, Tarey Bhir is where myth, history, and raw Himalayan grandeur collide into pure magic.',
    title: 'Tarey Bhir: A Sacred Hilltop in South Sikkim',  
    duration: '2-3 hours',
    districtname: 'Namchi',
    popularityCount: 78,
    seasons: ['all'],
    addedOn: '2025-02-15T14:15:00Z',
    tags: [
      { label: 'Hill Station' },
      { label: 'Nature View' },
      { label: 'Adventure' },
    ],
    galleryImages: [
      {
        itemImageSrc: 'assets/Images/destinations/tarey-bhir/Tarey_Bhir_(1).jpg',
        thumbnailImageSrc: 'assets/Images/destinations/tarey-bhir/Tarey_Bhir_(1).jpg',
        alt: 'Tarey Bhir View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/tarey-bhir/Tarey_Bhir_(2).jpg',
        thumbnailImageSrc: 'assets/Images/destinations/tarey-bhir/Tarey_Bhir_(2).jpg',
        alt: 'Tarey Bhir View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/tarey-bhir/tar.jpg',
        thumbnailImageSrc: 'assets/Images/destinations/tarey-bhir/tar.jpg',
        alt: 'Tarey Bhir View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/tarey-bhir/tar1.jpg',
        thumbnailImageSrc: 'assets/Images/destinations/tarey-bhir/tar1.jpg',
        alt: 'Tarey Bhir View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/tarey-bhir/tar3.jpg',
        thumbnailImageSrc: 'assets/Images/destinations/tarey-bhir/tar3.jpg',
        alt: 'Tarey Bhir View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/tarey-bhir/tar4.jpg',
        thumbnailImageSrc: 'assets/Images/destinations/tarey-bhir/tar4.jpg',
        alt: 'Tarey Bhir View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/tarey-bhir/tar5.jpg',
        thumbnailImageSrc: 'assets/Images/destinations/tarey-bhir/tar5.jpg',
        alt: 'Tarey Bhir View'
      },
    ],
    touristAttractions:[
      {
        title: 'Panoramic Views of the Himalayan Range',
        description: 'Enjoy sweeping vistas of the Eastern Himalayas, including the majestic Mount Kanchanjunga towering above the skyline.',
        images: [
          'assets/Images/destinations/tarey-bhir/tar.jpg',
        ],
      },
      {
        title:'Tarey Bhir viewpoint',
        description:'At Tarey Bhir, visitors can experience several stunning natural sights. The steep 10,000 ft vertical drop from the cliff offers a thrilling and dramatic landscape.',
        images: [
          'assets/Images/destinations/tarey-bhir/tar-attraction1.jpg',
        ],
      },
      {
        title:'Kalimpong and Darjeeling Hills',
        description:'On clear days, spot the charming hills of Kalimpong and Darjeeling, framed beautifully in the distant horizon.',
        images: [
          'assets/Images/destinations/tarey-bhir/tar1.jpg',
        ],
      }
    ],
    facilities: [
    ],
    safety:[
      {
        id: 'police-station',
        name: 'Namchi Police Station',
        description: 'The Namchi Police Station serves as the primary law enforcement agency for the Namchi area and its surroundings, including Tarey Bhir.',
        distance: '5KM and Above',
        contact: '03592-202892',
        address: 'Opposite Kisan Market, Namchi bazar, Namchi, Sikkim, India',
        location:{
          lat:'27.164948420937872',
          long:'88.36029856639986'
        },
        image: 'assets/Images/destinations/tarey-bhir/police-station.jpg',
        badge: '24/7 Service'
      },
      {
        id: 'Police-Booth',
        name: 'Bhanjyang Bazar Police Post',
        description: 'The Bhanjyang Bazar Police Post plays a vital role in ensuring public safety, maintaining law and order, and supporting the local community in the region',
        distance: '5 KM and Above',
        contact: '03592202747',
        address: 'Bhanjyang Bazaar, Namchi, Sikkim, India',
        location:{
          lat:'27.16061618127796',
          long:'88.4079644729543'
        },
        image: 'assets/Images/destinations/tarey-bhir/police-booth.jpg',
      }
    ],
    healthcare:[
      {
        id: 'hospital',
        name: 'Health and Wellness center - Sub - Health center',
        description: 'The Health and Wellness center is a primary healthcare facility serving the local community in and around Tarey Bhir.',
        distance: 'Under 4 KM',
        contact: '8388807775',
        address: 'Sadam , Namchi District',
        location:{
          lat:'27.17166778938794',
          long:'88.3669206532149'
        },
        image: 'assets/Images/destinations/tarey-bhir/hospital.jpg',
      }
    ],
    shops:[],
    accommodations:[
      {
        name: 'SAY HOMES GRACE homestay',
        image: 'assets/Images/destinations/tarey-bhir/hotel1.jpg',
        address: 'Upper Sukrabarey,Sadam,Namchi District',
        contact: '+91 8918984651',
        facilities: ['Single Bed Room', 'Double Bed Room', 'Valet Parking', 'Heater', 'Private Balcony','CCTV Camera']
      },
      {
        name: 'SHALOM homestay',
        image: 'assets/Images/destinations/tarey-bhir/hotel2.jpg',
        address: 'Namthang Road,Namchi district',
        contact: '+91 7319079996',
        facilities: ['Single Bed Room', 'Double Bed Room', 'Valet Parking', 'Heater', 'Private Balcony']
      }
    ],
    eateries:[
      {
        name: 'TASTE OF SADAM',
        image: 'assets/Images/destinations/tarey-bhir/resturant1.jpg',
        address: 'Sadam,Namchi District',
        contact: '+91 7679486311',
        facilities: ['Family Friendly', 'Digital Payment', 'Main Course', 'Chinese Food','Pet Friendly']
      }
    ],
    travelInfo:{
      transportModes:[
        {
          description: 'From Bagdogra Airport, you can hire a taxi or take a shared vehicle towards Sadam. The journey covers about 16 kilometers and takes approximately 30 minutes. En route, the road splits; ensure your driver takes the right fork to reach Tarey Bhir'
        },
        {
          description: 'From New Jalpaiguri Railway Station, you can hire a taxi or take a shared vehicle towards Sadam. The journey covers about 16 kilometers and takes approximately 30 minutes. En route, the road splits; ensure your driver takes the right fork to reach Tarey Bhir'
        },
        {
          description: 'From Namchi, you can hire a taxi or take a shared vehicle towards Sadam. The journey covers about 16 kilometers and takes approximately 30 minutes. En route, the road splits; ensure your driver takes the right fork to reach Tarey Bhir'
        }
      ],
      latitude:'27.112847879683084',
      longitude:'88.42797728544849'
    }
  }

  aritarLake={
    name: 'Aritar Lampokhari Lake',
    slug: 'aritar-lampokhari-lake',
    location: 'Aritar Lampokhari Lake,Pakyong,Sikkim,India',
    distance: 'Approx. 30 km from Rangpo',
    shortdescription: `Aritar Lampokhari Lake, also known as Aritar Lake, is one of the oldest natural freshwater lakes in Sikkim. Situated in the serene town of Aritar, this emerald boot-shaped lake is surrounded by lush green pine forests, offering a tranquil retreat for nature enthusiasts and spiritual seekers alike.`,
    fulldescription: 'Aritar Lampokhari Lake, also known as Aritar Lake, is a serene and picturesque retreat nestled in the eastern part of Sikkim, India. Situated at an elevation of approximately 4,600 feet (1,402 meters), this emerald boot-shaped lake is one of the oldest natural freshwater lakes in Sikkim. The lake measures about 1,120 feet in length and 240 feet in width, and is surrounded by lush green pine forests, creating a tranquil environment perfect for relaxation and nature appreciation. The lake holds spiritual significance for local communities, with a small shrine dedicated to Guru Padmasambhava located on its banks. Visitors can enjoy a leisurely walk along the pathway constructed around the lake, offering diverse perspectives of its natural beauty. Nearby attractions include the Aritar Monastery, known for its traditional architecture and monastic art, and the Mankhim Temple, which provides panoramic views of the surrounding landscape. The best time to visit Aritar Lampokhari Lake is during the summer months, from March to May, when the weather remains pleasant and cool.',
    title: 'Aritar Lampokhari Lake: Sikkim’s Emerald Jewel Amidst Pine Forests',
    duration: '2-3 hours',
    districtname: 'Pakyong',
    popularityCount: 91,
    seasons: ['spring', 'autumn'],
    addedOn: '2025-02-15T14:15:00Z',
    tags: [
      { label: 'Lake' },
      { label: 'Bird Watching' },
      { label: 'Natural Walk' },
      { label: 'Paddle Boating' },
    ],
    galleryImages: [
      {
        itemImageSrc: 'assets/Images/destinations/aritar-Lake/1.webp',
        thumbnailImageSrc: 'assets/Images/destinations/aritar-Lake/1.webp',
        alt: 'Aritar Lake View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/aritar-Lake/2.webp',
        thumbnailImageSrc: 'assets/Images/destinations/aritar-Lake/2.webp',
        alt: 'Aritar Lake View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/aritar-Lake/3.webp',
        thumbnailImageSrc: 'assets/Images/destinations/aritar-Lake/3.webp',
        alt: 'Aritar Lake View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/aritar-Lake/4.webp',
        thumbnailImageSrc: 'assets/Images/destinations/aritar-Lake/4.webp',
        alt: 'Aritar Lake View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/aritar-Lake/5.webp',
        thumbnailImageSrc: 'assets/Images/destinations/aritar-Lake/5.webp',
        alt: 'Aritar Lake View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/aritar-Lake/6.webp',
        thumbnailImageSrc: 'assets/Images/destinations/aritar-Lake/6.webp',
        alt: 'Aritar Lake View'
      },
      {
        itemImageSrc: 'assets/Images/destinations/aritar-Lake/7.webp',
        thumbnailImageSrc: 'assets/Images/destinations/aritar-Lake/7.webp',
        alt: 'Aritar Lake View'
      },

    ],  
    touristAttractions:[
      {
        title: 'Lamphokhri lake',
        description: 'The lake is a popular spot for picnicking and relaxation, with benches and tables scattered around its perimeter. The serene environment and the beautiful views of the surrounding mountains make it a perfect place for a leisurely stroll.',
        images: [
          'assets/Images/destinations/aritar-Lake/attraction/attraction1.1.webp',
          'assets/Images/destinations/aritar-Lake/attraction/attraction1.2.webp',
        ],   
      },
      {
        title: 'Zip-lining',
        description: 'Adding a touch of adventure to the tranquil surroundings, Aritar Lake features a zip line set against its scenic backdrop. While it doesn’t cross the lake itself, the ride offers a fun and safe experience, letting visitors glide through the crisp mountain air with beautiful views of the surrounding forests and hills. It’s a unique way to enjoy the natural beauty of the area from a different angle.',
        images: [
          'assets/Images/destinations/aritar-Lake/attraction/attraction3 (1).webp',
          'assets/Images/destinations/aritar-Lake/attraction/attraction3 (2).webp',
        ],
      },
      {
        title: 'Guru Padmasambhava',
        description: 'On the banks of Aritar Lake stands a serene shrine dedicated to Guru Padmasambhava, the revered saint who brought Buddhism to the Himalayas. Draped in prayer flags and nestled amid whispering pines, the shrine offers a quiet space for reflection and reverence. Locals and visitors alike light butter lamps here, seeking blessings and peace by the sacred waters that echo centuries of devotion.',
        images: [
          'assets/Images/destinations/aritar-Lake/attraction/attraction2.webp',
        ],
      },
      {
        title: 'Traditional Cooking Class',
        description: 'Right beside the tranquil Aritar Lake, Poonam’s Cooking Classes invite you to step into the heart of Sikkimese culinary heritage. Run by a local tourism veteran, this unique experience offers hands-on lessons in traditional pickle making, the art of folding perfect momos, and crafting khap-tyse—beautiful flower-shaped cookies beloved in local culture.',
        images: [
          'assets/Images/destinations/aritar-Lake/attraction/attraction4.1.webp',
          'assets/Images/destinations/aritar-Lake/attraction/attraction4.2.webp',
        ],
      },
      {
        title: 'Mangkhim Temple Hike',
        description: 'A short and scenic hike from Aritar Lake leads you to the sacred Mangkhim Temple, perched on a hilltop with sweeping views of the surrounding valleys and snow-capped peaks. This peaceful trail winds through pine forests and prayer flag-lined paths, offering moments of calm and quiet reflection. The temple, revered by the Rai community, stands as a spiritual beacon and a perfect spot to take in the natural and cultural beauty of East Sikkim.',
        images: [
          'assets/Images/destinations/aritar-Lake/attraction/attraction5.webp',
        ],
      }

    ],
    facilities: [
      {
        id: 'parking',
        title: 'Secure Parking',
        subtitle: 'Convenient Parking',
        description: 'Safe and convenient parking options with well-lit areas, easy access to the main area, and thoughtful security measures to ensure peace of mind.',
        image: 'assets/Images/destinations/aritar-Lake/facility/parking.webp',
        imageAlt: 'Parking',
        location: 'Main Parking Area',
        distance: '50m from main entrance',
        tags: [
          { text: '₹20 per Two Wheeler' },
          { text: '₹30 per Four Wheeler'},
          { text: 'Secure and well-lit area'}
        ],
      },
    ],
    safety:[
      {
        id: 'police-station',
        name: 'Rhenock Police Station',
        description: 'The Rhenock Police Station serves as the primary law enforcement agency for the Rhenock area and its surroundings, including Aritar Lake. It operates 24/7, ensuring the safety and security of residents and visitors.',
        distance: '5 kilometers and Above',
        contact: '9933490266',
        address: 'Rhenock Police Station; Rhenock Bazar, Rhenock, Pakyong District, Sikkim',
        location:{
          lat:'27.174970939808897',
          long:'88.6452678096149'
         },
        image: 'assets/Images/destinations/aritar-Lake/safety/police-statiion.webp',
        badge: '24/7 Service'
      },
    ],
    healthcare:[
      {
        id: 'hospital',
        name: 'Rhenock Hospital',
        description: 'The Rhenock Hospital is a primary healthcare facility serving the local community in and around Rhenock.',
        distance: 'Above 5 KM',
        contact: '9635302468',
        address: 'Rhenock Bazar, Pakyong District , Sikkim',
        location:{
          lat:'27.17453888474031',
          long:'88.64575453634791'
         },
         image: 'assets/Images/destinations/aritar-Lake/safety/renok-hospital.webp',
         badge: '24/7 Service'
      }
    ],
    shops:[
      {
        name: "Lal Babu Gupta",
        address: "Rongli Bazar, Rongli , Pakyong District",
        image: "assets/Images/destinations/aritar-Lake/shops/shop1.webp",
        category: "Souvenirs ",
        products: [
          { name: "Keychains", image: "assets/Images/destinations/aritar-Lake/shops/shop1product1.webp", category: "Souvenirs" },
        ]
      },
      {
        name: "Mangal Gift Shop",
        address: "Rongli Bazar, Rongli , Pakyong District",
        image: "assets/Images/destinations/aritar-Lake/shops/shop2.webp",
        category: "",
        products: [
          { name: "Destination Fridge Magnets", image: "assets/Images/destinations/aritar-Lake/shops/shop2product1.webp", category: "Plastic Products" },
          { name: "Oriental Design Tea Cups", image: "assets/Images/destinations/aritar-Lake/shops/shop2product2.webp", category: "Household Products" }
        ]
      },
      {
        name: "Jai Kumar Gift Shop",
        address: "Rongli Bazar, Rongli , Pakyong District",
        image: "assets/Images/destinations/aritar-Lake/shops/shop3.webp",
        category: "",
        products: [
          { name: "Keychains", image: "assets/Images/destinations/aritar-Lake/shops/shop3product1.webp", category: "Souvenirs" },
        ]
      }
    ],
    accommodations:[
      {
        name: "Lake View Cottage",
        image: "assets/Images/destinations/aritar-Lake/hotels/hotel1.webp",
        address: "Beside Lamphokhari Lake, Aritar, Pakyong District",
        contact: "+91 8972639124",
        facilities: [
          "Free WiFi",
          "Single Bed Room",
          "Double Bed Room",
          "Valet Parking",
          "Heater",
        ]
      },
      {
        name: "Hotel Aditya",
        image: "assets/Images/destinations/aritar-Lake/hotels/hotel2.webp",
        address: "Aritar Bazar, Pakyong District",
        contact: "+91 8145013140",
        facilities: [
          "Free WiFi",
          "Single Bed Room",
          "Double Bed Room",
          "Valet Parking",
          "Heater",
          "Television",
          "Private Balcony",
          "CCTV Camera",
          "First Aid Kit"
        ]
      },
      {
        name: "Eco Log Hut Resort",
        image: "assets/Images/destinations/aritar-Lake/hotels/hotel3.webp",
        address: "Beside Dak Bungalow, Aritar, Pakyong District",
        contact: "+91 6297200976",
        facilities: [
          "Free WiFi",
          "Single Bed Room",
          "Double Bed Room",
          "King Bed Room",
          "Valet Parking",
          "Heater",
          "Television",
          "Private Balcony",
          "CCTV Camera",
          "First Aid Kit"
        ]
      },
      {
        name: "Lampokhari Village Resort",
        image: "assets/Images/destinations/aritar-Lake/hotels/hotel4.webp",
        address: "Beside Lamphokhari Lake, Aritar, Pakyong District",
        contact: "+91 9734843981",
        facilities: [
          "Free WiFi",
          "Single Bed Room",
          "Double Bed Room",
          "King Bed Room",
          "Valet Parking",
          "Heater",
          "Television",
        ]
      }
    ],
    eateries:[
      {
        name: "Bhaichung Restaurant",
        image: "assets/Images/destinations/aritar-Lake/resturant/rest1.webp",
        address: "Aritar Bazar, Pakyong District",
        contact: "+91 9064023647",
        facilities: [
          "Family Friendly",
          "Digital Payment",
          "Multi Cuisine",
          "Appetizers",
          "Chinese Food",
          "Parking"
        ]
      },
      {
        name: "Lake View Fast Food",
        image: "assets/Images/destinations/aritar-Lake/resturant/rest2.webp",
        address: "Lamphokari Lake, Aritar",
        contact: "+91 8768120472",
        facilities: [
          "Family Friendly",
          "Digital Payment",
        ]
      },
      {
        name: "Punjabi Fast Food",
        image: "assets/Images/destinations/aritar-Lake/resturant/rest3.webp",
        address: "Aritar Bazar, Pakyong District",
        contact: "+91 9064023647",
      }
    ],
    travelInfo:{
      transportModes: [
        {
          description: 'From Bagdogra Airport, you can hire a taxi or a shared cab heading towards Pakyong and then onward to Aritar. The journey takes around 4 to 5 hours, offering scenic views of the Teesta River and hilly terrain.'
        },
        {
          description: 'From New Jalpaiguri (NJP) Railway Station, taxis and shared vehicles are available towards Pakyong. From there, a connecting ride will take you to Aritar Lampokhari Lake. The entire trip may take approximately 4 hours depending on road conditions.'
        },
        {
          description: 'From Namchi, you can reach Aritar by road via Rongli or Rhenock. Taxis and shared vehicles frequently ply this route, taking roughly 2 to 3 hours. The road winds through lush hills, offering beautiful vistas.'
        }
      ],
      
      latitude:'27.187255381582823',
      longitude:'88.6765699422714'
    }
  }
  
  tsongoLake={
    name: 'Tsongo Lake',
    slug: 'tsongo-lake',
    location: 'Tsongo Lake,Gangtok,Sikkim,India',
    distance: 'Approx. 40 km from Gangtok',
    shortdescription: `Tsomgo Lake, also called Changu Lake, is a 
    mesmerizing glacial lake located in East Sikkim, 
    India. It's a major tourist attraction, renowned for its 
     natural beauty, peaceful surroundings, and spiritual 
    significance.`,
   fulldescription: 'Tsomgo Lake, also known as Changu Lake, is a stunning glacial lake situated in East Sikkim, approximately 40 kilometers from Gangtok. Resting at an elevation of 3,753 meters, the lake is surrounded by snow-covered mountains and alpine forests, offering a serene and picturesque landscape. The lake is revered by the locals for its spiritual significance and is believed to be the dwelling place of a protective deity, drawing pilgrims and tourists alike. During winter, the lake freezes over, creating a magical, mirror-like reflection of the surroundings, while in spring and autumn, it comes alive with vibrant hues and blooming flora. The journey to Tsomgo Lake is equally scenic, making it a must-visit destination for anyone traveling to Sikkim. The best time to visit is between April to June and September to November, as winters often bring heavy snowfall that can block access to the region.',
    title: 'Tsomgo Lake: A Sacred Glacial Wonder of Sikkim',
    duration: '3–6 hours',
    districtname: 'Gangtok',
    popularityCount: 2000,
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    addedOn: '2025-05-08T14:15:00Z',
    tags: [
      { label: 'Glacial Lake' },
      { label: 'Scenic Drive' },
      { label: 'Photography Spot' },
      { label: 'Snow Views' },
      { label: 'Yak Ride' },
      { label: 'Spiritual Site' }
    ],    
    galleryImages: [
      {
        itemImageSrc: 'assets/Images/destinations/tsongo-Lake/1.webp',
        thumbnailImageSrc: 'assets/Images/destinations/tsongo-Lake/1.webp',
        alt: 'Tsongo Lake View'
      },
    ]
    
  }
  

  destinations = [
    this.rumtekMonastery,
    this.tareyBhir,
    this.aritarLake,
    this.tsongoLake
    // Add other destinations here as they are added
  ];

 getAllDestinations(){
  return this.destinations;
 }


}
