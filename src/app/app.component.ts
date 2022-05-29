import { Component } from '@angular/core';
// import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'Omni Method'

  // constructor(private readonly google: GoogleSigninService) {}
  constructor() {}

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