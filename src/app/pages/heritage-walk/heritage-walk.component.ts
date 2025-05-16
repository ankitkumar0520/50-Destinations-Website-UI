import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface HeritageWalkSection {
  title: string;
  address: string;
  description: string;
  images: string[];
  map: SafeResourceUrl; // sanitized embed url
  zoomLevel: number;
  timing?: string;
  phone?: string;
  fee?: string;
}

@Component({
  selector: 'app-heritage-walk',
  templateUrl: './heritage-walk.component.html',
  styleUrls: ['./heritage-walk.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HeritageWalkComponent implements OnInit {
  walks: HeritageWalkSection[] = [];

  minZoom = 0.5;
  maxZoom = 3;

  // Section separation colors (cycle through)
  sectionColors = [
    'bg-green-50 border-l-8 border-green-500',
    'bg-blue-50 border-l-8 border-blue-500',
    'bg-yellow-50 border-l-8 border-yellow-500',
  ];

  // Modal state for image viewer
  modalOpen = false;
  modalImages: string[] = [];
  modalIndex = 0;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.walks = [
      {
        title: 'Gangtok Heritage Walk',
        address: 'Secretariat to Enchey Monastery',
        description: `This captivating heritage walk begins at the historic Secretariat that served as Sikkim's first British administrative center. The trail then winds through Ridge Park, Gangtok's floral heart with stunning Himalayan views, before ascending to the sacred Enchey Monastery (1889), one of Sikkim's most important Buddhist sites. Along the way, discover hidden colonial architecture, vibrant prayer flags, and panoramic mountain vistas that define Gangtok's unique character.`,
        images: [
          'assets/Images/heritage-walk/gangtok1.jpeg',
          'assets/Images/heritage-walk/gangtok2.jpeg',
        ],
        map: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7089.246945641959!2d88.60509467770999!3d27.324970199999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a51351971001%3A0xdac7186d57236d94!2sTashiling%20Secretariat!5e0!3m2!1sen!2sin!4v1746599954758!5m2!1sen!2sin'
        ),
        zoomLevel: 1,
        timing: '9:00 AM ',
        phone: '03592-209090, 03592-209090',
        fee: '₹300 per person',
      },
      {
        title: 'Namchi Heritage Walk',
        address: 'Perbing to Central Park Namchi',
        description: `Experience the peaceful charm of rural Sikkim on this guided walk through Perbing's sacred sites and organic villages. The trail begins at the historic Perbing Santenling Monastery (founded 1935), a key Sherpa spiritual center, and continues to the tranquil Churu-Chopema Lake. Pass through the picturesque Perbing Organic Village before concluding at Central Park Namchi, where beautifully landscaped gardens offer a perfect resting spot.`,
        images: [
          'assets/Images/heritage-walk/namchi1.jpeg',
          'assets/Images/heritage-walk/namchi2.jpeg',
        ],
        map: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.3406051158604!2d88.4070602079263!3d27.17702970398128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e69e0f4ab7b47f%3A0x7257e1650d90a30a!2sPerbing%2C%20Sikkim%20737126!5e0!3m2!1sen!2sin!4v1746600642311!5m2!1sen!2sin'
        ),
        zoomLevel: 1,
        timing: '10:00 AM',
        phone: '7908688470 , 95473-3456',
        fee: '₹300 per person',
      },
      {
        title: 'Gyalshing Heritage Walk',
        address: 'Pemayangtse Monastery to Rabdentse Ruins',
        description: `Discover the rich culture and history of Sikkim through the Gyalshing Heritage Walk, a guided tour that takes you through the region's most iconic spiritual and historical sites. This immersive experience begins at the Pemayangtse Monastery, one of Sikkim’s oldest, founded in 1705, offering insights into its deep-rooted Buddhist traditions.

       The walk continues to Sangachoeling Monastery, home to the towering 137-foot Chenrezig Statue and a scenic skywalk that offers stunning views. The journey concludes at the Rabdentse Ruins, once the capital of Sikkim, where moss-covered remnants of royal structures lie hidden in a peaceful forest setting.`,
        images: [
          'assets/Images/heritage-walk/gyalshing1.jpeg',
          'assets/Images/heritage-walk/gyalshing2.jpeg',
        ],
        map: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28362.504256472566!2d88.23311632875216!3d27.303390175331796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6842d294c8d71%3A0x5ff926244a424543!2sPemayangtse%20Monastery%2C%20Sikkim%20737111!5e0!3m2!1sen!2sin!4v1746600720295!5m2!1sen!2sin'
        ),
        zoomLevel: 1,
        timing: '11:00 AM',
        phone: '7797887401, 58978-55257',
        fee: '₹300 per person',
      },
    ];
  }

  handleZoom(event: WheelEvent, idx: number) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    this.walks[idx].zoomLevel = Math.min(
      Math.max(this.walks[idx].zoomLevel + delta, this.minZoom),
      this.maxZoom
    );
  }

  zoomIn(idx: number) {
    this.walks[idx].zoomLevel = Math.min(
      this.walks[idx].zoomLevel + 0.1,
      this.maxZoom
    );
  }

  zoomOut(idx: number) {
    this.walks[idx].zoomLevel = Math.max(
      this.walks[idx].zoomLevel - 0.1,
      this.minZoom
    );
  }

  resetZoom(idx: number) {
    this.walks[idx].zoomLevel = 1;
  }

  // Modal logic
  openModal(images: string[], index: number) {
    this.modalImages = images;
    this.modalIndex = index;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
