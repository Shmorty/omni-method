import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {UserFirestoreService} from '../user-firestore.service';
import {Observable, map} from 'rxjs';
import {User} from '../../store/user/user.model';
import * as CommunityActions from '../../store/community/community.actions';
import {selectAllUsers, getSelectedUser, getIsLoading} from '../../store/community/community.selectors';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(
    private store: Store<AppState>,
  ) {}

  loadAllUsers() {
    this.store.dispatch(CommunityActions.loadCommunityUsers());
  }

  getAllUsersByScore() {
    console.log("community.service.getUsers");
    const sortFn = (a, b) => {
      return (a.omniScore < b.omniScore) ? 1 : (a.omniScore > b.omniScore) ? -1 : 0;
    }
    return this.store.select(selectAllUsers)
      .pipe(map((data) => [...data].sort(sortFn)));
  }

  loadSelectedUser(uid: string) {
    this.store.dispatch(CommunityActions.loadSelectedUser({uid}));
  }

  getSelectedUser() {
    return this.store.select(getSelectedUser);
  }

  isLoading() {
    return this.store.select(getIsLoading)
  }

}