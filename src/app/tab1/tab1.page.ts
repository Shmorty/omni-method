import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GoogleSigninService, UserInfo } from '../google-signin.service';
import { Assessment, Category } from '../assessment';
import { AssessmentService } from '../assessment.service';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userInfo?: UserInfo

  // static data
  omniScore :number = 245;

  assessments: Category[];

  // constructor(public httpClient:HttpClient, private readonly googleApi: GoogleSigninService) {
  constructor(private assessmentService:AssessmentService) {

    this.assessments = assessmentService.getAssessments()
    // googleApi.userProfileSubject.subscribe( info => {
    //   this.userInfo = info
    //   console.log("userInfo: ", this.userInfo)
    // })
    // this.loadData()
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
