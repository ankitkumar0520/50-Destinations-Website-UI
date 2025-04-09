import { Component } from '@angular/core';
import { HomeMinisterProfileComponent } from "../home-minister-profile/home-minister-profile.component";
import { HomeHeroSectionComponent } from "../home-hero-section/home-hero-section.component";
import { HomeDistrictCarouselComponent } from "../home-district-carousel/home-district-carousel.component";
import { HomeGallerySectionComponent } from "../home-gallery-section/home-gallery-section.component";
import { FooterComponent } from "../../../common/footer/footer.component";
@Component({
  selector: 'app-home-main',
  imports: [HomeMinisterProfileComponent,
    HomeDistrictCarouselComponent,
    HomeHeroSectionComponent,
    HomeGallerySectionComponent, FooterComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {

}
