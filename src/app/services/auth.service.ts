import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  UserCredential,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from '../store/user/user.model';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/user/user.actions';
import { AppState } from '../store/app.state';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  currUserId: string;
  currUserEmail: string;
  currUser: User;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.fireauth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn.next(true);
        console.log('AuthService: user is logged in');
        console.log(user);
        this.store.dispatch(
          UserActions.userAuthenticatd({
            payload: JSON.parse(JSON.stringify(user)),
          })
        );
        // router.navigate(['/home']);
      } else {
        // not logged in
        this.loggedIn.next(false);
        console.log('AuthService: user has logged off');
        router.navigate(['/welcome']);
      }
    });
  }

  public isLoggedIn(): boolean {
    // if (!!this.fireauth.currentUser) {
    this.currUserId = localStorage.getItem('userId');
    console.log('auth.isLoggedIn: ' + this.currUserId);
    if (this.loggedIn.value) {
      console.log('currUserId: ' + this.currUserId);
      return true;
    }
    return false;
  }

  // auth = getAuth();

  currentUser(): Promise<any> {
    return this.fireauth.currentUser;
  }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
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

  // doRegister(email: string, password: string): Observable<UserCredential>{
  //   return from(this.fireauth.createUserWithEmailAndPassword(email, password));
  // }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
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
    this.fireauth.signOut().then(
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
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // email verification
  sendVerificationMail() {
    return this.fireauth.currentUser
      .then((u) => u?.sendEmailVerification())
      .then(() => {
        // this.router.navigate(['verify-email']);
        alert('email verification link sent');
      });
  }

  // sign in with google method
  googleSignIn() {
    // this is not supported in device only browser
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigate(['/home']);
        this.saveUser(res);
        this.currUser = {
          id: res.user.uid,
          nickname: res.user.displayName,
          email: res.user.email,
          avatar: res.user.photoURL,
          firstName: 'first',
          lastName: 'last',
          dob: null, //'1976-07-04',
          weight: 100,
        };
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  saveUser(res) {
    console.log('user authenticated, user id: '.concat(res.user.uid));
    this.currUserId = res.user.uid;
    this.currUserEmail = res.user.email;
    // this.currUser = {
    //   id: res.user.uid,
    //   nickname: res.user.displayName,
    //   email: res.user.email,
    //   avatar: res.user.photoURL,
    //   firstName: 'first',
    //   lastName: 'last',
    //   dob: null, //'1976-07-04',
    //   weight: 100,
    // };
    // console.log(this.currUser);
  }
}
