import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGallerySectionComponent } from './home-gallery-section.component';

describe('HomeGallerySectionComponent', () => {
  let component: HomeGallerySectionComponent;
  let fixture: ComponentFixture<HomeGallerySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGallerySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGallerySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
