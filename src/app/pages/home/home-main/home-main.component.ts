import { Component } from '@angular/core';
import { HomeHeroSectionComponent } from '../home-hero-section/home-hero-section.component';
import { HomeDistrictCarouselComponent } from '../home-district-carousel/home-district-carousel.component';
import { HomeGallerySectionComponent } from '../home-gallery-section/home-gallery-section.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { HomeAboutSectionComponent } from '../home-about-section/home-about-section.component';
@Component({
  selector: 'app-home-main',
  imports: [
    HomeDistrictCarouselComponent,
    HomeHeroSectionComponent,
    HomeGallerySectionComponent,
    FooterComponent,
    HomeAboutSectionComponent,
  ],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css',
})
export class HomeMainComponent {}
