import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PoliceLocation {
  name: string;
  distance: string;
  contact: string;
  address: string;
  image: string;
}

@Component({
  selector: 'app-police',
  imports: [CommonModule],
  templateUrl: './police.component.html',
  styleUrl: './police.component.css'
})
export class PoliceComponent {
  policeStation: PoliceLocation = {
    name: 'Main Police Station',
    distance: '500m',
    contact: '+91 1234567890',
    address: '123 Main Street, City Center, State - 123456',
    image: 'assets/Images/sample-images/image1.png'
  };

  policeBooth: PoliceLocation = {
    name: 'Tourist Police Booth',
    distance: '200m',
    contact: '+91 9876543210',
    address: 'Near Tourist Information Center, City Center, State - 123456',
    image: 'assets/Images/sample-images/image1.png'
  };
}
