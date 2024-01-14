import {Component, OnInit} from '@angular/core';
import {selectAllAssessments} from '../../store/assessments/assessment.selector';
import {Store} from '@ngrx/store';
import {Assessment} from '../../store/assessments/assessment.model';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {Score} from '../../store/models/score.model';
import {User} from '../../store/user/user.model';
import {AuthService} from 'src/app/services/auth.service';
import {Observable} from 'rxjs';
import {AssessmentService} from 'src/app/services/assessments/assessment.service';
import {isPlatform} from '@ionic/angular';
import {StatusBar, Style} from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  isInfoOpen = false;
  public assessments$ = this.assessmentService.getAllAssessments();
  public step = 0;
  public assessmentCount = 0;
  public curAssessment: Assessment;
  public values = [];
  public curValue: number;
  private user: User;
  public scores$: Observable<Score[]>;
  public displayChecked: boolean[] = [];
  public isChecklist = false;

  constructor(
    private assessmentService: AssessmentService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user$ = this.userService.getUser();
    user$.subscribe((value) => {
      this.user = value;
      console.log("user", this.user);
    }).unsubscribe();
    this.assessments$.subscribe((arr) => this.assessmentCount = arr.length);
    // this.scores$ = this.userService.getScoresForAssessment(assessment);
    this.scores$ = undefined;
  }

  ionViewWillEnter() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (Capacitor.isNativePlatform()) {
      // if (isPlatform('mobile')) {
      // StatusBar.setStyle({style: Style.Dark});
      if (prefersDark.matches) {
        StatusBar.setStyle({style: Style.Dark});
      } else {
        StatusBar.setStyle({style: Style.Light});
      }
    }
  }

  newValue(val) {
    this.curValue = val;
  }

  previous() {
    --this.step;
    this.assessmentService.getAssessmentByIndex(this.step).pipe().subscribe((assessment) => {
      this.isChecklist = assessment.checklist;
    });
  }

  next() {
    if ((this.step + 1) < this.assessmentCount) {
      ++this.step;
      this.assessmentService.getAssessmentByIndex(this.step).pipe().subscribe((assessment) => {
        this.isChecklist = assessment.checklist;
      });
    } else {
      this.userService.reloadUser();
      this.router.navigate(['home']);
    }
  }

  updateChecked(checked) {
    // if (this.displayChecked.length) {
    //   this.checklistChanged = true;
    //   this.routerOutlet.swipeGesture = false;
    // }
    this.displayChecked = checked;
  }

  save(assessment: Assessment) {
    // if userId not set return to login
    const userId = this.authService.currUserId;
    if (!userId) {
      alert("userId missing please return to login");
      this.router.navigate(['login']);
      return;
    }
    // save assessment score
    var today = new Date().toLocaleDateString();
    const score: Score = {
      aid: assessment.aid,
      uid: this.authService.currUserId,
      cid: assessment.cid,
      rawScore: this.curValue,
      scoreDate: today,
      expired: false,
      notes: 'onboarding',
    };
    if (assessment.checklist) {
      score.checklist = this.displayChecked;
      score.rawScore = this.displayChecked.filter(item => item).length;
    }
    this.userService.saveScore(score);
    this.next();
  }

  openInfo(assessment: Assessment) {
    this.curAssessment = assessment;
    this.setOpen(true);
  }

  direction(assessment: Assessment) {
    const reverse = ["PSPR", "TWOMDST", "AGLTY"];
    if (reverse.includes(assessment.aid)) {
      return -1;
    }
    return 1;
  }

  setOpen(isOpen: boolean) {
    this.isInfoOpen = isOpen;
  }

}
