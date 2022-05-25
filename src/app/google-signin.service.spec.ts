import { TestBed } from '@angular/core/testing';

import { GoogleSigninService } from './google-signin.service';

describe('GoogleSigninService', () => {
  let service: GoogleSigninService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleSigninService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
