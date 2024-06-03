import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentScoresPage } from './assessment-scores.page';

describe('AssessmentScoresPage', () => {
  let component: AssessmentScoresPage;
  let fixture: ComponentFixture<AssessmentScoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
