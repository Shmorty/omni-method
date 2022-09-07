import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
// import { GoogleSigninService, UserInfo } from '../google-signin.service';
import { Assessment } from '../store/models/assessment.model';
import { Category } from '../store/models/category.model';
import { AssessmentService } from '../assessment.service';
import { AssessmentDetailPage } from '../assessment-detail/assessment-detail.page';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../store/models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/state.model';
import { selectUser } from '../store/selectors/user.selectors';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  user$: Observable<User>;

  // userInfo?: UserInfo

  // static data
  // omniScore :number = 245;

  assessments: Category[];

  // constructor(public httpClient:HttpClient, private readonly googleApi: GoogleSigninService) {
  constructor(
    private assessmentService:AssessmentService,
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) {

    this.assessments = assessmentService.getAssessments()
    // googleApi.userProfileSubject.subscribe( info => {
    //   this.userInfo = info
    //   console.log("userInfo: ", this.userInfo)
    // })
    // this.loadData()
  }

  ngOnInit(): void {
      this.user$ = this.store.select((store) => store.user);
      // this.user$ = selectUser;
  }

  async openAssessmentDetailModal(assessment, category) {
    const modal = this.modalController.create({
      component: AssessmentDetailPage,
      componentProps: {
        'assessment': assessment,
        'category': category,
      },
    });
    console.log("label: " + assessment.label);
    //     assessment-detail
    // this.router.navigate(['/assessment-detail'], {skipLocationChange: false});
    return (await modal).present();
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
