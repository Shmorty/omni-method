import {Injectable, inject} from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  QuerySnapshot,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {User} from '../store/user/user.model';
import {Observable, from, of} from 'rxjs';
import {Score} from '../store/models/score.model';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserFirestoreService {
  private firestore: Firestore = inject(Firestore);
  private userDocRef: DocumentReference<DocumentData>;

  constructor() {}

  scoreDate(score: Score): string {
    let d = new Date(score.scoreDate);
    let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
    let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
    let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
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

  async checkNickname(nicknameToCheck: string) {
    const userCollection = collection(this.firestore, "user");
    const nicknameQuery = query(userCollection, where("nickname", "==", nicknameToCheck));
    let nicknameSnapshot: QuerySnapshot;
    try {
      nicknameSnapshot = await getDocs(nicknameQuery);
      console.log("nickname snapshot size", nicknameSnapshot?.size);
      console.log("nickname docs length", nicknameSnapshot.docs.length)
    } catch (err) {
      console.log("check nickname error", err);
      return false;
    }
    //
    const result: boolean = nicknameSnapshot.empty;
    console.log("check nickname return", result);
    return result;
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

  async getUserAssessmentScores(id: string, aid: string) {
    let res = null;
    console.log("getUserAssessmentScores from firestore", id, aid);
    const scoresCollection = collection(this.firestore, 'user', `${id}`, 'score');
    console.log("collection", scoresCollection);
    const scoreQuery = query(scoresCollection, where("aid", "==", aid));
    console.log("scoreQuery", scoreQuery);
    let querySnapshot;
    try {
      console.log("await getDocs");
      querySnapshot = await getDocs(scoreQuery);
      console.log("finshed getDocs", querySnapshot);
    } catch (error) {
      console.log("error", error);
      querySnapshot = undefined;
    }
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
    console.log("querySnapshot size", querySnapshot?.size);
    if (querySnapshot.empty) {
      console.log("return empty array");
      return [];
    }
    console.log("return querySnapshot", querySnapshot.docs.entries())
    return querySnapshot.docs;
    // const sub = collectionData(scoreQuery).subscribe((scores) => {
    //   console.log("scores", scores);
    //   res = scores;
    // });
    // sub.unsubscribe();
    // return res;
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

  deleteUserFromDb(user: User) {
    console.log('deleteUser', user);
    deleteDoc(
      doc(
        this.firestore,
        'user',
        `${user.id}`,
      )
    );
    return of(user);
  }

}
