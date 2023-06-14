import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  // GoogleAuthProvider,
  // FacebookAuthProvider,
  // UserCredential,
  user,
  User,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  // signInWithPopup,
} from '@angular/fire/auth';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
// import { User } from '../store/user/user.model';
import * as OmniUser from '../store/user/user.model';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/user/user.actions';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  authState$ = authState(this.auth);
  userSubscription: Subscription;

  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  currUserId: string;
  currUserEmail: string;
  currUser: OmniUser.User;

  constructor(private router: Router, private store: Store<AppState>) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.store.dispatch(
          UserActions.userAuthenticatd({payload: JSON.parse(JSON.stringify({user: user}))})
        );

      } else {
        console.log("User is signed out");
        this.router.navigate(['/login']);
      }
    });
  }

  currentUser(): Promise<any> {
    return Promise.resolve(this.currUser);
    // return this.fireauth.currentUser;
  }

  // login method
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(
      (res) => {
        // localStorage.setItem('userId', res.user.uid);
        this.saveUser(res);
        this.store.dispatch(
          UserActions.userAuthenticatd({
            payload: JSON.parse(JSON.stringify(res)),
          })
        );
        // this.router.navigate(['home']);
      },
      (err) => {
        console.log(err);
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  // register method
  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password).then(
      (res) => {
        console.log('register user success: '.concat(res.user.email));
        const clonedUser = JSON.parse(JSON.stringify(res.user));
        console.log(clonedUser);
        // this.store.dispatch(
        //   UserActions.registerUserSuccess({ payload: clonedUser })
        // );
        this.store.dispatch(
          UserActions.userAuthenticatd({
            payload: JSON.parse(JSON.stringify(res)),
          })
        );
        // this.saveUser(res);
        this.router.navigate(['/new-user']);
      },
      (err) => {
        console.log(err['code']);
        this.store.dispatch(
          UserActions.registerUserFailure({ error: err['code'] })
        );
        // alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  // logout method
  logout() {
    signOut(this.auth).then(
      () => {
        // localStorage.removeItem('userId');
        this.store.dispatch(UserActions.logoutAction())
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // forgot password method
  forgotPassword(email: string) {
    sendPasswordResetEmail(this.auth, email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // email verification
  // sendVerificationMail() {
  //   return this.fireauth.currentUser
  //     .then((u) => u?.sendEmailVerification())
  //     .then(() => {
  //       // this.router.navigate(['verify-email']);
  //       alert('email verification link sent');
  //     });
  // }

  /*  googleSignIn_codetrix() {
    // this.user = await GoogleAuth.signIn();
    GoogleAuth.signIn().then(
      (res) => {
        console.log('success: ', res);
        // localStorage.setItem('userId', res.id);
        this.currUserId = res.id;
        this.currUserEmail = res.email;
        // UserActions.signinSuccess should trigger load user
        // if user not found got to register user
        // if user found go to home page
        this.store.dispatch(
          UserActions.userAuthenticatd({
            payload: JSON.parse(JSON.stringify(res)),
          })
        );
        // this.router.navigate(['home']);
      },
      (error) => {
        console.log('error ', error);
      }
    );
  } */

  googleSignIn_firebase() {
    const provider = new GoogleAuthProvider();
    if (provider) {
      console.log('signInWithRedirect');
      signInWithRedirect(this.auth, provider);
      return getRedirectResult(this.auth).then(
        (result) => {
          console.log('redirect successful, ', result);
        },
        (error) => {
          console.log('google redirect login failed, ', error);
          const errorCode = error.code;
          const errorMessage = error.message;
        }
      );
    } else {
      console.log('signInWithPopup');
      return signInWithPopup(this.auth, provider).then(
        (result) => {
          console.log('logged in with google, ', result);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          console.log('credential, ', credential);
          const token = credential.accessToken;
          const user = result.user;
          const additionaInfo = getAdditionalUserInfo(result);
          console.log('additionalInfo, ', additionaInfo);
        },
        (error) => {
          console.log('google popup login failed, ', error);
          const errorCode = error.code;
          const errorMessage = error.message;
          const credential = GoogleAuthProvider.credentialFromError(error);
        }
      );
    }
  }

  // sign in with google method
  // googleSignIn() {
  //   // this is not supported in device only browser
  //   return (
  //     signInWithPopup(this.auth, new GoogleAuthProvider())
  //       // return this.fireauth.signInWithPopup(new GoogleAuthProvider())
  //       .then(
  //         (res) => {
  //           this.router.navigate(['/home']);
  //           this.saveUser(res);
  //           this.currUser = {
  //             id: res.user.uid,
  //             nickname: res.user.displayName,
  //             email: res.user.email,
  //             avatar: res.user.photoURL,
  //             firstName: 'first',
  //             lastName: 'last',
  //             dob: null, //'1976-07-04',
  //             weight: 100,
  //           };
  //         },
  //         (err) => {
  //           alert(err.message);
  //         }
  //       )
  //   );
  // }

  private saveUser(res) {
    console.log('user authenticated, user id: '.concat(res.user.uid));
    this.currUserId = res.user.uid;
    this.currUserEmail = res.user.email;
  }
}
