import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from "../../destination-details/hero-section/hero-section.component";
import { GalleryDescriptionComponent } from "../gallery-description/gallery-description.component";

@Component({
  selector: 'app-destination-main',
  templateUrl: './destination-main.component.html',
  styleUrls: ['./destination-main.component.css'],
  imports: [HeroSectionComponent, GalleryDescriptionComponent]
})
export class DestinationMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
