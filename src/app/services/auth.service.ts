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
  // signInWithPopup,
} from '@angular/fire/auth';
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
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      if (aUser) {
        this.loggedIn.next(true);
        console.log('AuthService: user is logged in');
        console.log(aUser);
        this.store.dispatch(
          UserActions.userAuthenticatd({
            payload: JSON.parse(JSON.stringify(aUser)),
          })
        );
      } else {
        // not logged in
        this.loggedIn.next(false);
        console.log('AuthService: user has logged off');
        router.navigate(['/welcome']);
      }
    });
  }

  // public isLoggedIn(): boolean {
  //   // if (!!this.fireauth.currentUser) {
  //   this.currUserId = localStorage.getItem('userId');
  //   console.log('auth.isLoggedIn: ' + this.currUserId);
  //   if (this.loggedIn.value) {
  //     console.log('currUserId: ' + this.currUserId);
  //     return true;
  //   }
  //   return false;
  // }

  currentUser(): Promise<any> {
    return Promise.resolve(this.currUser);
    // return this.fireauth.currentUser;
  }

  // login method
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(
      (res) => {
        localStorage.setItem('userId', res.user.uid);
        this.saveUser(res);
        this.router.navigate(['home']);
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
        this.store.dispatch(
          UserActions.registerUserSuccess({ payload: clonedUser })
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
        localStorage.removeItem('userId');
        this.router.navigate(['/welcome']);
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
