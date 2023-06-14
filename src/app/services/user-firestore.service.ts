import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../store/user/user.model';
import { Observable, from, of } from 'rxjs';
import { Score } from '../store/models/score.model';

@Injectable({
  providedIn: 'root',
})
export class UserFirestoreService {
  private firestore: Firestore = inject(Firestore);
  private userDocRef: DocumentReference<DocumentData>;

  constructor() {}

  scoreDate(score: Score): string {
    let d = new Date(score.scoreDate);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const scoreDate = `${ye}-${mo}-${da}`;
    return scoreDate;
  }

  getUserById(id: string): Observable<User> {
    console.log('getUser from firestore ', id);
    this.userDocRef = doc(this.firestore, `user/${id}`);
    const userDocSnap = docData(this.userDocRef, {
      idField: 'id',
    });
    return userDocSnap as Observable<User>;
  }

  // unsubscribeUser() {
  //   if (this.userDocRef) {
  //     console.log("unsubscribe userDocRef");
  //     this.userDocRef();
  //     // this.userDocRef.unsubscribe();
  //   }
  // }

  getAllUsers(): Observable<User[]> {
    console.log('getAllUsers from firestore');

    const userCollection = collection(this.firestore, "user");
    return collectionData(userCollection) as Observable<User[]>;
  }

  addUser(user: User): Observable<any> {
    console.log('addUser to firestore');

    // const userCollection = collection(this.firestore, 'user');
    // return from(addDoc(userCollection, user));
    return from(setDoc(doc(this.firestore, 'user', user.id), user));
  }

  updateUser(user: User): Observable<any> {
    console.log('updateUser to firestore', user.id);

    const userDocRef = doc(this.firestore, `user/${user.id}`);
    console.log('docRef', userDocRef.id, userDocRef.path);
    console.log('user', user);
    return from(updateDoc(userDocRef, Object(user)));
  }

  getUserScores(id: string): Observable<Score[]> {
    console.log('getUserScores from firestore');
    const scoresCollection = collection(
      this.firestore,
      'user',
      `${id}`,
      'score'
    );
    return collectionData(scoresCollection) as Observable<Score[]>;
  }

  saveScoreToDb(score: Score): Observable<Score> {
    console.log('saveScore', score);
    setDoc(
      doc(
        this.firestore,
        'user',
        `${score.uid}`,
        'score',
        `${score.aid}#${this.scoreDate(score)}`
      ),
      score
    );
    return of(score);
  }

  deleteScoreFromDb(score: Score) {
    console.log('deleteScore', score);
    deleteDoc(
      doc(
        this.firestore,
        'user',
        `${score.uid}`,
        'score',
        `${score.aid}#${this.scoreDate(score)}`
      )
    );
    return of(score);
  }
}
