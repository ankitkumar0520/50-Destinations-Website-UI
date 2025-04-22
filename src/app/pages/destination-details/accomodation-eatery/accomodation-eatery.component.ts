import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';

interface Accommodation {
  name: string;
  image: string;
  address: string;
  contact: string;
  facilities: string[];
}

interface Eatery {
  name: string;
  image: string;
  address: string;
  contact: string;
  facilities: string[];
}

@Component({
  selector: 'app-accomodation-eatery',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './accomodation-eatery.component.html',
  styleUrl: './accomodation-eatery.component.css',
})
export class AccomodationEateryComponent {
  selectedHotel: Accommodation | null = null;
  selectedEatery: Eatery | null = null;

  private destinationService = inject(DestinationService);

  destination = this.destinationService.getDestionation();
  imageService = inject(ImageService);

  openHotelModal(hotel: Accommodation) {
    this.selectedHotel = hotel;
    document.body.style.overflow = 'hidden';
  }

  closeHotelModal() {
    this.selectedHotel = null;
    document.body.style.overflow = 'auto';
  }

  openEateryModal(eatery: Eatery) {
    this.selectedEatery = eatery;
    document.body.style.overflow = 'hidden';
  }

  closeEateryModal() {
    this.selectedEatery = null;
    document.body.style.overflow = 'auto';
  }
}
