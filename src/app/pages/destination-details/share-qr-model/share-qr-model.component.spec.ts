import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareQRModelComponent } from './share-qr-model.component';

describe('ShareQRModelComponent', () => {
  let component: ShareQRModelComponent;
  let fixture: ComponentFixture<ShareQRModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareQRModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareQRModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
