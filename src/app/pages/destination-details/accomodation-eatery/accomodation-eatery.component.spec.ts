import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationEateryComponent } from './accomodation-eatery.component';

describe('AccomodationEateryComponent', () => {
  let component: AccomodationEateryComponent;
  let fixture: ComponentFixture<AccomodationEateryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomodationEateryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccomodationEateryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
