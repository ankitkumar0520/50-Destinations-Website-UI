/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VoiceModelService } from './voice-model.service';

describe('Service: VoiceModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoiceModelService]
    });
  });

  it('should ...', inject([VoiceModelService], (service: VoiceModelService) => {
    expect(service).toBeTruthy();
  }));
});
