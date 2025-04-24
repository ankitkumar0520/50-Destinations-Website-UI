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
     voiceoverContent: `Welcome to Rumtek Monastery — a spiritual sanctuary nestled amidst the misty hills of Gangtok, Sikkim.

                Located just 23 kilometers from Gangtok, Rumtek Monastery is one of the most significant and largest Tibetan Buddhist monasteries in India. Perched at an altitude of about 
                5,800 feet, the monastery offers a peaceful escape from the bustling town, with panoramic views of the surrounding mountains and valleys.

                Originally built in the 16th century by the 9th Karmapa, Wangchuk Dorje, 
                Rumtek Monastery was rebuilt in the 20th century under the guidance of the 16th Karmapa after he fled Tibet. Today, it serves as the main seat of the Karma Kagyu lineage outside of Tibet and is also known as the Dharmachakra Centre.

                As you walk through its ornate gates, you'll be greeted by vibrant murals,
                 colorful prayer flags fluttering in the breeze, and the calming sound of monks chanting ancient mantras. The monastery houses many sacred relics, ancient scriptures, and a golden stupa containing the remains of the 16th Karmapa.

                One of the most striking aspects of Rumtek is its architecture — a perfect blend of traditional Tibetan design and modern craftsmanship. The main prayer hall is adorned with majestic thangkas, statues, and intricate woodwork that tell stories of Buddhist teachings.

                Rumtek is not just a place of worship — it's a center of learning, meditation, and cultural preservation. Visitors often witness prayer ceremonies, rituals, and sometimes even traditional Tibetan festivals celebrated by the monks.

                To reach Rumtek, you can travel by road from Gangtok — either by private taxi or shared cab. The journey, though winding, is scenic and serene, taking you through lush forests and picturesque villages.

                Whether you're a spiritual seeker, a cultural explorer, or a curious traveler, Rumtek Monastery promises a soulful experience — one that lingers in your heart long after you've left its tranquil grounds.

                Thank you for visiting Rumtek Monastery — a beacon of peace, devotion, and timeless wisdom.`,

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
      safty:[
        {
          id: 'police-station',
          name: 'Ranipool Police Station',
          description: 'The Ranipool Police Station serves as the primary law enforcement agency for the Ranipool area and its surroundings, including Rumtek Monastery. It operates 24/7, ensuring the safety and security of residents and visitors.',
          distance: '12 kilometers away',
          contact: '03592-251712',
          address: 'Gangtok-Rangpo Road, Upper Tadong, Sikkim, 737135',
          location:{
            lat:'12.121',
            long:'232.212'
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
            lat:'ttfv',
            long:''
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
  }

}
