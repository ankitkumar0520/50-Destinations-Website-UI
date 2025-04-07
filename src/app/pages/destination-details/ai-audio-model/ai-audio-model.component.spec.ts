import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAudioModelComponent } from './ai-audio-model.component';

describe('AiAudioModelComponent', () => {
  let component: AiAudioModelComponent;
  let fixture: ComponentFixture<AiAudioModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAudioModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAudioModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
