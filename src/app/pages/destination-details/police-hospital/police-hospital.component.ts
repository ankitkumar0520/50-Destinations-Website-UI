import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PoliceLocation {
  name: string;
  distance: string;
  contact: string;
  address: string;
  image: string;
}

@Component({
  selector: 'app-police-hospital',
  imports: [CommonModule],
  templateUrl: './police-hospital.component.html',
  styleUrl: './police-hospital.component.css'
})
export class PoliceHospitalComponent implements OnInit {
  ngOnInit(): void {
    
  }
  policeStation: PoliceLocation = {
    name: 'Main Police Station',
    distance: '2.5 km',
    contact: '+91 1234567890',
    address: '123 Police Station Road, City Center',
    image: 'assets/Images/sample-images/police-station.jpg'
  };

  policeBooth: PoliceLocation = {
    name: 'Tourist Police Booth',
    distance: '1.2 km',
    contact: '+91 9876543210',
    address: 'Tourist Information Center, Main Square',
    image: 'assets/Images/sample-images/police-booth.jpg'
  };

  hospital: PoliceLocation = {
    name: 'Main Hospital',
    distance: '3.0 km',
    contact: '+91 1122334455',
    address: '456 Medical Center Road, City Center',
    image: 'assets/Images/sample-images/hospital.jpg'
  };

  medicalCamp: PoliceLocation = {
    name: 'Medical Camp',
    distance: '1.5 km',
    contact: '+91 3344556677',
    address: '789 Health Center Lane, Tourist Area',
    image: 'assets/Images/sample-images/medical-camp.jpg'
  };

  constructor() { }

}
