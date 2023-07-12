import {Component, OnInit} from '@angular/core';
import {selectAllAssessments} from '../../store/assessments/assessment.selector';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  public assessments$ = this.store.select(selectAllAssessments);

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
  }

}
