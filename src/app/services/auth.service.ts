import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // auth = getAuth();

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        if (res.user?.emailVerified == true) {
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
    // createUserWithEmailAndPassword(this.auth, email, password)
    //   .then((userCredential) => {
    //     // signed in
    //     const user = userCredential.user;
    //   })
    //   .catch((error) => {
    //     const errorCode = error.errorCode;
    //     const errorMessage = error.errorMessage;
    //   });
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration successful');
        this.router.navigate(['/login']);
        this.sendVerificationMail();
        // this.sendEmailForVerification(email);
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
      });
  }
  sendEmailForVerification(user: any) {
    // this.fireauth.sendEmailVerification(user).then(
    //   (res: any) => {
    //     this.router.navigate(['/verify-email']);
    //   },
    //   (err: any) => {
    //     alert(err.message);
    //   }
    // );
  }
}
