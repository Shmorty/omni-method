import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Assessment } from './store/assessments/assessment.model';
import { User } from './store/user/user.model';
import { AppState } from './store/app.state';
import { AuthService } from './services/auth.service';
import { CategoriesService } from './services/categories.service';
import { AssessmentService } from './api/assessments/assessment.service';
import { UserService } from './api/user/user.service';

// import { GoogleSigninService } from './google-signin.service';

/*
theme
https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=03c4e6&primary.text.color=000000
*/

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Omni Method';
  assessments$: Observable<Array<Assessment>>;

  // constructor(private readonly google: GoogleSigninService) {}
  // constructor(private store: Store<AppState>) {}

  constructor(
    private categoryService: CategoriesService,
    private assessmentService: AssessmentService,
    private userService: UserService
  ) {
    console.log('categoryService.load()');
    categoryService.load();
    console.log('assessmentService.load()');
    assessmentService.load();
    console.log('userService.load()');
    userService.load();
  }

  ngOnInit(): void {
    // this.assessments$ = this.store.select((store) => store.assessments);
  }
}

// import {NgZone} from '@angular/core';
// import {Plugins} from '@capacitor/core';
// import {OAuthService} from 'angular-oauth2-oidc';
// import {Router} from '@angular/router';

// const {App, Browser, Device} = Plugins;

// export class AppComponent {

//   constructor(
//     private zone: NgZone,
//     private oauthService: OAuthService,
//     private router: Router,
//   ) {
//     this.listenForOAuthRedirect();
//   }

//   private async listenForOAuthRedirect() {
//     // example of the important stuff
//     const oauthParameters = {
//       responseType: 'code',
//       // the IDP must redirect to the App URI (it should be whitelisted)
//       redirectUri: 'custom-app-uri://localhost',
//       // open a new browser window when starting implicit flow
//       openUri: url => Browser.open({url})
//     };

//     this.oauthService.configure(oauthParameters);

//     App.addListener('appUrlOpen', async data => {
//       const platform = (await Device.getInfo()).platform as Platform;

//       // because reasons
//       if (platform === 'ios') {
//         await Browser.close();
//       }

//       await this.zone.run(async () => {
//         await this.oauthService.tryLogin({customHashFragment: data.url.substr(data.url.indexOf('?'))});

//         const hasValidAccessToken = await this.oauthService.hasValidAccessToken();

//         if(hasValidAccessToken){
//           await this.router.navigate(['/your-protected-route-after-login']);
//         }
//       });
//     });
//   }

// }
