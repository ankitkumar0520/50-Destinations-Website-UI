import { Component, OnInit, HostListener } from '@angular/core';
import { HeroSectionComponent } from "../../destination-details/hero-section/hero-section.component";
import { GalleryDescriptionComponent } from "../gallery-description/gallery-description.component";
import { PointsOfInterestComponent } from "../points-of-interest/points-of-interest.component";
import { FacilitiesComponent } from '../facilities/facilities.component';
import { PoliceHospitalComponent } from '../police-hospital/police-hospital.component';
import { ShopsComponent } from '../shops/shops.component';
import { AccomodationEateryComponent } from '../accomodation-eatery/accomodation-eatery.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-destination-main',
  standalone: true,
  templateUrl: './destination-main.component.html',
  styleUrls: ['./destination-main.component.css'],
  imports: [
    CommonModule,
    HeroSectionComponent, 
    GalleryDescriptionComponent,
    PointsOfInterestComponent, 
    FacilitiesComponent,
    PoliceHospitalComponent,
    ShopsComponent,
    AccomodationEateryComponent,
    FontAwesomeModule
  ]
})
export class DestinationMainComponent implements OnInit {
  showModal = false;
  shareUrl = 'https://your-link.com';
  showScrollTop = false;
  private scrollThreshold = 300;

  // Define icon property
  arrowUp = faArrowUp;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > this.scrollThreshold;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
