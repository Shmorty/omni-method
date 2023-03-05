import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularDelegate, IonModal, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
// import { GoogleSigninService, UserInfo } from '../google-signin.service';
import { Assessment, Category } from '../../store/assessments/assessment.model';
// import { Category } from '../../store/categories/category.model';
import { AssessmentService } from '../../api/assessments/assessment.service';
import { AssessmentDetailPage } from '../assessment-detail/assessment-detail.page';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from '../../store/user/user.model';
import { Score } from '../../store/models/score.model';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../store/app.state';
import { UserService } from '../../api/user/user.service';
import { NewScorePage } from '../new-score/new-score.page';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
// import { selectAllCategories } from 'src/app/store/categories/category.selector';
import {
  selectAllAssessments,
  selectAllCategories,
} from 'src/app/store/assessments/assessment.selector';
import {
  assessmentScores,
  selectUser,
  userScores,
} from 'src/app/store/user/user.selectors';
import { OmniScoreService } from 'src/app/services/omni-score.service';
import {
  selectCategoryScore,
  selectOmniScore,
} from 'src/app/store/omni-score/omni-score.selector';
import { first } from 'rxjs/operators';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  // pipes: ['category-sort'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  subscription: Subscription;
  userId: string;
  user: User;
  scores: Score[];
  // userLoaded: boolean = false;
  omniScore: number = 0;
  unadjustedScore: number = 0;

  // using global ngrx store
  public categories$ = this.store.select(selectAllCategories);
  public assessments$ = this.store.select(selectAllAssessments);
  public user$ = this.store.select(selectUser);
  public scores$ = this.store.select(userScores);
  public omniScore$ = this.store.select(selectOmniScore);

  // categories: Category[];
  // assessments: Assessment[];
  // categoryScores: Map<string, number> = new Map<string, number>();

  constructor(
    private store: Store,
    private assessmentService: AssessmentService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    // console.log('profilePage ngOnInit');
    // this.auth.currentUser().then((usr) => {
    //   if (usr == null) {
    //     console.log('no session send user to login');
    //     this.router.navigate(['/login']);
    //     return;
    //   }
    //   console.log('save user data');
    //   this.auth.currUserId = usr.uid;
    //   this.auth.currUserEmail = usr.email;
    //   console.log(usr);
    //   this.userId = usr.uid;
    //   this.loadData();
    // });
    // this.subscription = this.userService.onNewScore().subscribe((score) => {
    //   this.loadUserData();
    // });
  }

  getCategoryScore(category: Category) {
    console.log('getCategoryScore() ', category.label);
    return this.store.select(selectCategoryScore(category));
  }

  getScores$(assessment: Assessment) {
    console.log('  assessmentScores() ', assessment.label);
    return this.store.select(assessmentScores(assessment));
  }

  getScores(assessment: Assessment): Array<Score> {
    console.log('getScores from ', this.scores);
    return this.scores?.filter((element) => element.aid == assessment.aid);
  }

  openDetails(assessment, category) {
    this.assessmentService.setCurrentCategory(category);
    this.assessmentService.setCurrentAssessment(assessment);
    this.assessmentService.setCurrentScores(this.getScores(assessment));
    this.router.navigate([
      '/home',
      'profile',
      'details',
      { aid: assessment.aid },
    ]);
  }

  isLoggedIn(): boolean {
    // return this.googleApi.isLoggedIn()
    return true;
  }

  // scoreClass(date: Date): string {
  scoreClass(scoreDate: string): string {
    var date = new Date(scoreDate);
    const oneDay = 1000 * 3600 * 24;
    let days = Math.ceil((Date.now().valueOf() - date.valueOf()) / oneDay);

    if (days > 90) {
      return 'stale';
    } else if (days > 60) {
      return 'warn';
    } else if (days > 30) {
      return 'caution';
    }
  }

  async openNewScore(e, assessment) {
    e.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: NewScorePage,
      componentProps: {
        assessment: assessment,
      },
      cssClass: 'new-score-modal',
      presentingElement: document.querySelector('ion-router-outlet'),
      canDismiss: true,
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      // this.loadUserData();
    });
  }
}
