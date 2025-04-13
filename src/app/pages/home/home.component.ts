import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { FooterComponent } from '../../common/footer/footer.component';
import { HomeAboutSectionComponent } from './home-about-section/home-about-section.component';
import { HomeDistrictCarouselComponent } from './home-district-carousel/home-district-carousel.component';
import { HomeGallerySectionComponent } from './home-gallery-section/home-gallery-section.component';
import { HomeHeroSectionComponent } from './home-hero-section/home-hero-section.component';
register();

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HomeDistrictCarouselComponent,
    HomeHeroSectionComponent,
    HomeGallerySectionComponent,
    HomeAboutSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {}
