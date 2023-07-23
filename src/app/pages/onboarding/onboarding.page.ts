import {Component, OnInit} from '@angular/core';
import {selectAllAssessments} from '../../store/assessments/assessment.selector';
import {Store} from '@ngrx/store';
import {Assessment} from 'src/app/store/assessments/assessment.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  isInfoOpen = false;
  public assessments$ = this.store.select(selectAllAssessments);
  public step = 1;
  public assessmentCount = 0;
  public curAssessment: Assessment;
  public values = [];
  public theNumber: number;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.assessments$.subscribe((arr) => this.assessmentCount = arr.length);
  }

  newValue(event) {
    // console.log("newValue", event);
    this.theNumber = event;
  }

  previous() {
    --this.step;
  }

  next() {
    if ((this.step + 1) < this.assessmentCount) {
      ++this.step;
    } else {
      this.router.navigate(['home']);
    }
  }

  save(assessment: Assessment) {
    console.log("save", assessment.aid);
    console.log("value", this.theNumber);
    this.next();
  }

  openInfo(assessment: Assessment) {
    this.curAssessment = assessment;
    this.setOpen(true);
  }

  setOpen(isOpen: boolean) {
    this.isInfoOpen = isOpen;
  }

}
