import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
// import { GoogleSigninService, UserInfo } from '../google-signin.service';
import { Assessment } from '../store/models/assessment.model';
import { Category } from '../store/models/category.model';
import { AssessmentService } from '../api/assessments/assessment.service';
import { AssessmentDetailPage } from '../assessment-detail/assessment-detail.page';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from '../store/models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/state.model';
import { UserService } from '../api/user/user.mock.service';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: User;
  omniScore :number = 245;

  // static data
  // omniScore :number = 245;

  assessments: Category[];

  // constructor(public httpClient:HttpClient, private readonly googleApi: GoogleSigninService) {
  constructor(
    private userService: UserService,
    private assessmentService: AssessmentService,
    public modalController: ModalController,
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
      this.userService.getUser().subscribe(data => {
        this.user = data;
      });
      this.assessmentService.getAssessments().subscribe(data => {
        this.assessments = data;
      })
  }

  openDetails(assessment, category) {
    this.assessmentService.setCurrentCategory(category);
    this.assessmentService.setCurrentAssessment(assessment);
    this.router.navigate(['/home', 'profile', 'details']);
  }

  isLoggedIn(): boolean {
    // return this.googleApi.isLoggedIn()
    return true
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
