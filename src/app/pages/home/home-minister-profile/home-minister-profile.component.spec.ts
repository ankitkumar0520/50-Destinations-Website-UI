import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMinisterProfileComponent } from './home-minister-profile.component';

describe('HomeMinisterProfileComponent', () => {
  let component: HomeMinisterProfileComponent;
  let fixture: ComponentFixture<HomeMinisterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMinisterProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMinisterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
