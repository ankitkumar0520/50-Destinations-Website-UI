import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';


@Component({
  selector: 'app-police-hospital',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './police-hospital.component.html',
  styleUrl: './police-hospital.component.css',
})
export class PoliceHospitalComponent implements OnInit {
  private destinationService = inject(DestinationService);

  destination :any;
  imageService = inject(ImageService);

  constructor() {}

  ngOnInit(): void {
    this.destinationService.destination$.subscribe(dest => {
      if (dest) {
        this.destination = dest;
      }
    });
  }
}
