import { HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {filter, first, take, tap} from 'rxjs/operators';
import {User} from '../../store/user/user.model';
import {IUserService} from './user.service.interface';
import {Score} from '../../store/models/score.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import * as UserActions from '../../store/user/user.actions';
import {
  assessmentScores,
  currentScore,
  selectAuthUser,
  selectUser,
} from '../../store/user/user.selectors';
import {Assessment} from '../../store/assessments/assessment.model';
import {UserFirestoreService} from '../user-firestore.service';
import {ModalController} from '@ionic/angular';
import {EditProfilePage} from 'src/app/pages/edit-profile/edit-profile.page';
import {UploadMetadata, UploadTask, getDownloadURL, getStorage, ref, uploadBytesResumable} from '@angular/fire/storage';

export const usernameMinLength = 5;
export const usernameMaxLength = 20;

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {

  constructor(
    private store: Store<AppState>,
    private firestoreService: UserFirestoreService,
    private modalCtrl: ModalController,
  ) {}

  // get user from store
  getUser() {
    return this.store.select(selectUser).pipe(filter(usr => usr !== null));
  }

  reloadUser() {
    this.store.select(selectAuthUser).subscribe((authUser) => {
      this.store.dispatch(UserActions.loadUserAction({uid: authUser?.user.uid}));
    });
  }

  async saveAvatarFile(blob: Blob, filename: string): Promise<string> {
    console.log("saveAvatarFile", blob);
    const storage = getStorage();
    const metadata: UploadMetadata = {
      contentType: blob.type,
    }
    let task: UploadTask;
    await this.getUser().pipe(take(1)).forEach((user) => {
      task = uploadBytesResumable(ref(storage, "/users/" + user.id + "/" + filename), blob, metadata);
    });
    await task.then(
      (snapshot) => {
        console.log("onFulfilled snapshot", snapshot);
      },
      (error) => {
        console.log("onRejected error", error);
      });
    console.log("return getDownloadURL with storageRef", task.snapshot.ref);
    return getDownloadURL(task.snapshot.ref);
  }

  isUsernameAvailable(username: string) {
    console.log("is username available ", username);
    return this.firestoreService.checkUsername(username);
  }

  // trigger new user action
  saveNewUser(user: User) {
    console.log("userService.saveNewUser", user);
    this.store.dispatch(UserActions.newUser({payload: user}));
  }

  // trigger update user action
  updateUser(user: User) {
    console.log('userService.updateUser');
    this.store
      .select(selectAuthUser)
      .pipe(first())
      .subscribe((authUser) => {
        console.log('authUser', authUser);
        user.id = authUser['uid'] || authUser.user['uid'];
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

  getCurrentScoreForAssessment(aid: string): Observable<Score> {
    return this.store.select(currentScore(aid));
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

  async openEditProfile(event, user) {
    event.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {
        user: user,
      },
      cssClass: 'edit-user-modal',
      // presentingElement: document.querySelector('ion-router-outlet'),
      canDismiss: true,
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      // this.loadUserData();
    });
  }

  static getAge(user: User) {
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
