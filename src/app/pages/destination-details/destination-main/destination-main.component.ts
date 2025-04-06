import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from "../../destination-details/hero-section/hero-section.component";
import { GalleryDescriptionComponent } from "../gallery-description/gallery-description.component";
import { PointsOfInterestComponent } from "../points-of-interest/points-of-interest.component";
import { FacilitiesComponent } from '../facilities/facilities.component';
import { PoliceComponent } from '../police/police.component';
@Component({
  selector: 'app-destination-main',
  standalone: true,
  templateUrl: './destination-main.component.html',
  styleUrls: ['./destination-main.component.css'],
  imports: [HeroSectionComponent, GalleryDescriptionComponent,
     PointsOfInterestComponent, FacilitiesComponent,
    PoliceComponent]
})
export class DestinationMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
