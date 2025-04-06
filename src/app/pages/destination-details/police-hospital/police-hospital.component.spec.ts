import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceHospitalComponent } from './police-hospital.component';

describe('PoliceHospitalComponent', () => {
  let component: PoliceHospitalComponent;
  let fixture: ComponentFixture<PoliceHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliceHospitalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
