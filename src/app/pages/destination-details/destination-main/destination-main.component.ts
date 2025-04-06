import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from "../../destination-details/hero-section/hero-section.component";
import { GalleryDescriptionComponent } from "../gallery-description/gallery-description.component";
import { PointsOfInterestComponent } from "../points-of-interest/points-of-interest.component";
import { FacilitiesComponent } from '../facilities/facilities.component';
import { PoliceHospitalComponent } from '../police-hospital/police-hospital.component';
import { ShopsComponent } from '../shops/shops.component';
import { AccomodationEateryComponent } from '../accomodation-eatery/accomodation-eatery.component';


@Component({
  selector: 'app-destination-main',
  standalone: true,
  templateUrl: './destination-main.component.html',
  styleUrls: ['./destination-main.component.css'],
  imports: [HeroSectionComponent, GalleryDescriptionComponent,
     PointsOfInterestComponent, FacilitiesComponent
     , PoliceHospitalComponent,ShopsComponent,AccomodationEateryComponent,
    ]
})
export class DestinationMainComponent implements OnInit {

  showModal = false;
  shareUrl = 'https://your-link.com'; // Provide actual link
  

  constructor() { }

  ngOnInit() {
  }

}
