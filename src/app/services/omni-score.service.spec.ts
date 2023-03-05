import { TestBed } from '@angular/core/testing';

import { OmniScoreService } from './omni-score.service';

describe('OmniScoreService', () => {
  let service: OmniScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmniScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
