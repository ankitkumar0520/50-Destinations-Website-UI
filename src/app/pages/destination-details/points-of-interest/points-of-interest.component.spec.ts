/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PointsOfInterestComponent } from './points-of-interest.component';

describe('PointsOfInterestComponent', () => {
  let component: PointsOfInterestComponent;
  let fixture: ComponentFixture<PointsOfInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsOfInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
