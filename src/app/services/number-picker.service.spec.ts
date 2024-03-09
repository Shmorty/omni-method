import { TestBed } from '@angular/core/testing';

import { NumberPickerService } from './number-picker.service';

describe('NumberPickerService', () => {
  let service: NumberPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
