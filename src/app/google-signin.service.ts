import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: environment.gapi_client_id,
  scope: 'openid profile email'
}

export interface UserInfo {
  info: {
    sub: string,
    email: string,
    email_verified
    family_name: string,
    given_name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {

  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oAuthService: OAuthService) { 
    oAuthService.configure(oAuthConfig)
    oAuthService.loadDiscoveryDocument().then( () => {
      oAuthService.tryLoginImplicitFlow().then( () => {
        if(!oAuthService.hasValidIdToken()) {
          oAuthService.initLoginFlow()
        } else {
          oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)
          })
        }
      })
    })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  public signOut() {
    this.oAuthService.logOut()
  }


}
