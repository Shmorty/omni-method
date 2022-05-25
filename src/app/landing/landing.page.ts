import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  users = [
    {id: 1, userName: "Raymond"},
    {id: 2, userName: "Renee"},
    {id: 3, userName: "Lyla"}
  ]
  constructor() { }

  ngOnInit() {
  }
  signIn() {
    // oAuthService.tryLogin().then(() => {
    // console.log('tryLogin complete, hasValidToken ', (oAuthService.hasValidIdToken() ? 'yes' : 'no'))
    // })
  }

}
