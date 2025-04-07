import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './police-hospital.component.html',
  styleUrl: './police-hospital.component.css'
})
export class PoliceHospitalComponent implements OnInit {
  policeLocations: PoliceLocation[] = [
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
  ];

  healthcareLocations: PoliceLocation[] = [
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
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
