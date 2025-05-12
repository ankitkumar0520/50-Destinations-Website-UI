import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DestinationService } from '../../../services/destination.service';
import { ImageService } from '../../../services/image.service';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-police-hospital',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './police-hospital.component.html',
  styleUrl: './police-hospital.component.css',
})
export class PoliceHospitalComponent implements OnInit {
  private destinationService = inject(DestinationService);

  imageService = inject(ImageService);
  hospital:any[]=[];
  police:any[]=[];  
  baseUrl = environment.apiBaseUrl.replace('/api', '');
  constructor() {}

  ngOnInit(): void {
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();

    this.destinationService.destination$.subscribe(dest => {

      if(dest?.entities){
      this.hospital = dest.entities.filter((entity: any) => {
        if (!entity) return false; // Skip if entity is null or undefined
    
        // Normalize sectorName, check case insensitively
        const name = (normalize(entity.sectorName || '')).toLowerCase();
    

        // Check if sectorId is 6 or if sectorName matches 'safety and emergency - healthcare service' case-insensitively
        return entity.sectorId === 6 || name === 'safety and emergency - healthcare service';


      });


      this.police = dest.entities.filter((entity: any) => {
        if (!entity) return false; // Skip if entity is null or undefined
    
        // Normalize sectorName, check case insensitively
        const name = (normalize(entity.sectorName || '')).toLowerCase();
    
        // Check if sectorId is 1 or if sectorName matches 'safety and emergency - police service' case-insensitively
        return entity.sectorId === 1 || name === 'safety and emergency - police service';
      });
    }
    });
     
  }
  

  
}
