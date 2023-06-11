import { TestBed } from '@angular/core/testing';

import { UserFirestoreService } from './user-firestore.service';

describe('UserFirestoreService', () => {
  let service: UserFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
