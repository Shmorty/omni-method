import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistanceSpeedPickerComponent } from './distance-speed-picker.component';

describe('DistanceSpeedPickerComponent', () => {
  let component: DistanceSpeedPickerComponent;
  let fixture: ComponentFixture<DistanceSpeedPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DistanceSpeedPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DistanceSpeedPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
