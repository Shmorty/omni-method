import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, first, map, single, take, tap} from 'rxjs/operators';
import {User} from '../../store/user/user.model';
import {IUserService} from './user.service.interface';
import {Score} from '../../store/models/score.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import * as UserActions from '../../store/user/user.actions';
import {
  assessmentScores,
  selectAuthUser,
  selectUser,
} from '../../store/user/user.selectors';
import {Assessment} from '../../store/assessments/assessment.model';
import {UserFirestoreService} from '../user-firestore.service';
import {AuthService} from '../auth.service';
import {ModalController} from '@ionic/angular';
import {EditProfilePage} from 'src/app/pages/edit-profile/edit-profile.page';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  constructor(private http: HttpClient,
    private store: Store<AppState>,
    private firestoreService: UserFirestoreService,
    private modalCtrl: ModalController,
    private authService: AuthService) {}

  // get user from store
  getUser() {
    return this.store.select(selectUser);
  }

  reloadUser() {
    this.store.select(selectAuthUser).subscribe((authUser) => {
      // console.log("selectAuthUser authUser", authUser.user.uid);
      this.store.dispatch(UserActions.loadUserAction({uid: authUser?.user.uid}));
    });
    // this.authService.currentUser().then((authUser) => {
    //   console.log("authService authUser", authUser);
    // });
    // console.log("authService currUserId", this.authService.currUserId);
  }

  getUserRankings(): Observable<User[]> {
    // get from firestore
    const sortFn = (a, b) => {
      return (a.omniScore < b.omniScore) ? 1 : (a.omniScore > b.omniScore) ? -1 : 0;
    }
    return this.firestoreService.getAllUsers().pipe(map((data) => data.sort(sortFn)));
  }

  // trigger new user action
  saveNewUser(user: User) {
    console.log('userService.saveNewUser');
    this.store.dispatch(UserActions.newUser({payload: user}));
    /*
        this.store
          .select(selectAuthUser)
          .pipe(first())
          .subscribe(
            (authUser) => {
              console.log('got authUser ', authUser);
              user.id = authUser['uid'];
              user.email = authUser['email'];
              console.log('user', user);
              // newUser action
              console.log('dispatch newUser action');
              this.store.dispatch(UserActions.newUser({payload: user}));
            },
            (err) => {
              console.error('Observer got an error: ' + err);
            }
          );
    */
  }

  // trigger update user action
  updateUser(user: User) {
    console.log('userService.updateUser');
    this.store
      .select(selectAuthUser)
      .pipe(first())
      .subscribe((authUser) => {
        console.log('authUser', authUser);
        user.id = authUser['uid'];
        console.log('user', user);
        // updateUserAction
        console.log('dispatch updateUser action');
        this.store.dispatch(UserActions.updateUserAction({payload: user}));
      });
  }

  // get score from store
  getScoresForAssessment(assessment: Assessment): Observable<Score[]> {
    return this.store.select(assessmentScores(assessment)).pipe(
      tap((results) => {
        results.sort(function (a, b) {
          return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
        });
      })
    );
  }

  // trigger save score event
  saveScore(score: Score) {
    console.log("dispatch saveNewScore event", score);
    this.store.dispatch(UserActions.saveNewScore({score}));
  }

  // trigger delete score event
  deleteScore(score: Score) {
    this.store.dispatch(UserActions.deleteAssessmentScore({score}));
  }

  deleteUser(user: User) {
    this.store.dispatch(UserActions.deleteUser({user}));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Unable to process request; please try again later.')
    );
  }

  async openEditProfile(e, user) {
    e.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {
        user: user,
      },
      cssClass: 'edit-user-modal',
      presentingElement: document.querySelector('ion-router-outlet'),
      canDismiss: true,
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      // this.loadUserData();
    });
  }

  getAge(user: User) {
    var today = new Date();
    var birthDate = new Date(user.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}
