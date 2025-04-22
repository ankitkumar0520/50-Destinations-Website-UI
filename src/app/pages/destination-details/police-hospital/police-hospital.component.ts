import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';

interface PoliceLocation {
  id: string;
  name: string;
  description: string;
  distance: string;
  contact: string;
  address: string;
  image: string;
  type: string;
  badge?: string;
}

@Component({
  selector: 'app-police-hospital',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './police-hospital.component.html',
  styleUrl: './police-hospital.component.css',
})
export class PoliceHospitalComponent implements OnInit {
  private destinationService = inject(DestinationService);

  destination = this.destinationService.getDestionation();
  imageService = inject(ImageService);

  constructor() {}

  ngOnInit(): void {}
}
