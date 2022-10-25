import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
// import { GoogleSigninService, UserInfo } from '../google-signin.service';
import { Assessment } from '../../store/models/assessment.model';
import { Category } from '../../store/models/category.model';
import { AssessmentService } from '../../api/assessments/assessment.service';
import { AssessmentDetailPage } from '../assessment-detail/assessment-detail.page';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from '../../store/models/user.model';
import { Score } from '../../store/models/score.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models/state.model';
import { UserService } from '../../api/user/user.service';
import { NewScorePage } from '../new-score/new-score.page';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  // pipes: ['category-sort'],
})
export class ProfilePage implements OnInit {
  user: User;
  scores: Score[];
  userLoaded: boolean = false;
  omniScore: number = 245;

  categories: Category[];
  assessments: Assessment[];

  // constructor(public httpClient:HttpClient, private readonly googleApi: GoogleSigninService) {
  constructor(
    private userService: UserService,
    private assessmentService: AssessmentService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    // this.assessments = assessmentService.getAssessments()
    // googleApi.userProfileSubject.subscribe( info => {
    //   this.userInfo = info
    //   console.log("userInfo: ", this.userInfo)
    // })
    // this.loadData()
  }

  ngOnInit(): void {
    // this.user$ = this.store.select((store) => store.user);
    this.userService.getUser('0001').subscribe(async (data) => {
      // await new Promise((f) => setTimeout(f, 5000));
      this.user = data['user'];
      this.scores = data['scores'];
      this.userLoaded = true;
      console.log('got user: ' + JSON.stringify(this.user));
      console.log('got scores: ' + JSON.stringify(this.scores));
    });

    this.assessmentService.getAssessments().subscribe((data) => {
      this.assessments = data['assessments'];
      console.log('got assessments: ' + JSON.stringify(this.assessments));
    });
    this.assessmentService.getCategories().subscribe((data) => {
      this.categories = data['categories'];
      // sort categories
      this.categories.sort((a, b) => {
        if (a.seq < b.seq) {
          return -1;
        } else if (a.seq > b.seq) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log('got categories: ' + JSON.stringify(this.categories));
    });
  }

  openDetails(assessment, category) {
    this.assessmentService.setCurrentCategory(category);
    this.assessmentService.setCurrentAssessment(assessment);
    this.assessmentService.setCurrentScores(this.getScores(assessment));
    this.router.navigate(['/home', 'profile', 'details']);
  }

  isLoggedIn(): boolean {
    // return this.googleApi.isLoggedIn()
    return true;
  }

  // scoreClass(date: Date): string {
  scoreClass(assessment: Assessment): string {
    var scores = this.getScores(assessment);
    var date = new Date();
    if (scores?.length) {
      date = new Date(scores[0].scoreDate);
    }
    const oneDay = 1000 * 3600 * 24;
    const days = Math.ceil((Date.now().valueOf() - date.valueOf()) / oneDay);

    if (days > 30) {
      return 'stale';
    } else if (days > 14) {
      return 'warn';
    }
  }

  getScores(assessment: Assessment): Array<Score> {
    return this.scores?.filter((element) => element.aid == assessment.aid);
  }

  getRawScore(assessment: Assessment): number {
    var scores = this.getScores(assessment);
    if (scores?.length) {
      return scores[0].rawScore;
    }
    return 0;
  }

  // logout() {
  //   this.googleApi.signOut()
  // }

  // loadData() {
  //   this.httpClient.get(`${API_URL}`).subscribe(results => {
  //     console.log(results);
  //   })

  // }
}
