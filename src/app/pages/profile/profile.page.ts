import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
// import { GoogleSigninService, UserInfo } from '../google-signin.service';
import { Assessment, Category } from '../../store/assessments/assessment.model';
import { AssessmentService } from '../../services/assessments/assessment.service';
import { Router } from '@angular/router';
import { User } from '../../store/user/user.model';
import { Score } from '../../store/models/score.model';
import { Subscription } from 'rxjs';
import { NewScorePage } from '../new-score/new-score.page';
import { Store } from '@ngrx/store';
import {
  selectAllAssessments,
  selectAllCategories,
} from 'src/app/store/assessments/assessment.selector';
import * as UserSelectors from 'src/app/store/user/user.selectors';
import {
  selectCategoryScore,
  selectOmniScore,
} from 'src/app/store/omni-score/omni-score.selector';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  subscription: Subscription;
  userId: string;
  user: User;
  scores: Score[];
  omniScore: number = 0;
  unadjustedScore: number = 0;

  // using global ngrx store
  public categories$ = this.store.select(selectAllCategories);
  public assessments$ = this.store.select(selectAllAssessments);
  public user$ = this.store.select(UserSelectors.selectUser);
  public scores$ = this.store.select(UserSelectors.userScores);
  public omniScore$ = this.store.select(selectOmniScore);

  constructor(
    private store: Store,
    private assessmentService: AssessmentService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    console.log('profile.page.ngOnInit()');
    this.user$
      // .pipe(first())
      .subscribe({
        next(user) {
          this.user = user;
          console.log(user);
        },
        error(message) {
          console.log(message);
        },
      })
      .unsubscribe();
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

  showEditProfile() {
    console.log('showEditPage');
  }

  getCategoryScore(category: Category) {
    return this.store.select(selectCategoryScore(category));
  }

  getScores$(assessment: Assessment) {
    return this.store.select(UserSelectors.assessmentScores(assessment)).pipe(
      tap((results) => {
        results?.sort(function (a, b) {
          return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
        });
      })
    );
  }

  openDetails(assessment) {
    this.router.navigate(['/home', 'profile', 'details'], {
      queryParams: { aid: assessment.aid, cid: assessment.cid },
    });
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

  getAge(user: User) {
    var today = new Date();
    var birthDate = new Date(user.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  async openNewScore(e, assessment, user) {
    e.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: NewScorePage,
      componentProps: {
        assessment: assessment,
        user: user,
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
