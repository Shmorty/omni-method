import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../api/user/user.service';
import { User } from '../store/models/user.model';
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
    private userService: UserService
  ) {
    this.fireauth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn.next(true);
        console.log('AuthService: user is logged in');
      } else {
        // not logged in
        this.loggedIn.next(false);
        console.log('AuthService: user has logged off');
      }
    });
  }

  public isLoggedIn(): boolean {
    // if (!!this.fireauth.currentUser) {
    if (this.loggedIn.value) {
      console.log('currUserId: ' + this.currUserId);
      return true;
    }
    return false;
  }

  // auth = getAuth();

  currentUser() {
    return this.fireauth.currentUser;
  }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        if (res.user?.emailVerified == true) {
          this.saveUser(res);
          this.router.navigate(['home']);
        } else {
          this.sendVerificationMail();
          // this.sendEmailForVerification(res.user);
          this.router.navigate(['verify-email']);
        }
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
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        // this.router.navigate(['/new-user']);
        this.sendVerificationMail();
        this.currUserId = res.user.uid;
        this.currUserEmail = res.user.email;
        this.saveUser(res);
        // create user in database
        this.currUser.firstName = 'first';
        this.currUser.lastName = 'last';
        this.currUser.nickname = 'nickname';
        this.userService.addUser(this.currUser).subscribe(
          (data) => {
            console.log('addUser returned ' + JSON.stringify(data));
          },
          (err) => {
            console.log('Error: ' + err().message);
            alert(err().message);
          }
        );
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  // logout method
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.fireauth.signOut();
        this.router.navigate(['/login']);
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
        this.router.navigate(['verify-email']);
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
    console.log('email verified, user id: '.concat(res.user.uid));
    this.currUserId = res.user.uid;
    this.currUserEmail = res.user.email;
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
    console.log(this.currUser);
  }
}
