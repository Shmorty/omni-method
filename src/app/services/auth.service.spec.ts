import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore()
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
