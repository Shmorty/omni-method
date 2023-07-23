import {Component, OnInit} from '@angular/core';
import {selectAllAssessments} from '../../store/assessments/assessment.selector';
import {Store} from '@ngrx/store';
import {Assessment} from 'src/app/store/assessments/assessment.model';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user/user.service';
import {Score} from 'src/app/store/models/score.model';

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
  public curValue: number;

  constructor(
    private store: Store,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.assessments$.subscribe((arr) => this.assessmentCount = arr.length);
  }

  newValue(val) {
    this.curValue = val;
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
    var today = new Date().toLocaleDateString();
    // console.log("save", assessment.aid, this.curValue);
    const score: Score = {
      aid: assessment.aid,
      uid: 'this.user.id',
      cid: assessment.cid,
      rawScore: this.curValue,
      scoreDate: today,
      expired: false,
      notes: 'onboarding',
    };
    console.log('save new score: ' + JSON.stringify(score));
    // missing user id
    // this.userService.saveScore(score);
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
