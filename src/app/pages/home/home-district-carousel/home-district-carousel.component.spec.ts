import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDistrictCarouselComponent } from './home-district-carousel.component';

describe('HomeDistrictCarouselComponent', () => {
  let component: HomeDistrictCarouselComponent;
  let fixture: ComponentFixture<HomeDistrictCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDistrictCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDistrictCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
