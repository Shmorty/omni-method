import {AuthenticationUser, User} from './user.model';
import * as UserActions from './user.actions';
import {createReducer, on} from '@ngrx/store';
import {Score} from '../models/score.model';

export interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User;
  authUser: any;
  scores: Score[];
  error: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  authUser: null,
  loading: false,
  user: null,
  scores: [],
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userAuthenticated, (state, action) => ({
    ...state,
    isAuthenticated: true,
    authUser: action.payload,
  })),
  on(UserActions.logoutAction, (state) => ({
    ...state,
    isAuthenticated: false,
    authUser: null,
  })),
  on(UserActions.loadUserAction, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(UserActions.loadUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.payload, //['user'],
    scores: [], //action.payload['scores'],
    error: '',
  })),
  on(UserActions.loadUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(UserActions.registerUserSuccess, (state, action) => ({
    ...state,
    authUser: action.payload,
    loading: false,
    error: '',
  })),
  on(UserActions.registerUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(UserActions.newUser, (state, action) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(UserActions.newUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.payload,
    error: '',
  })),
  on(UserActions.newUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(UserActions.updateUserAction, (state, action) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(UserActions.saveNewScore, (state, action) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.saveNewScoreSuccess, (state, action) => {
    console.log('UserActions.saveNewScoreSuccess reducer');
    // remove old score for activity and date from store if it existed
    let tmpScores = state.scores.filter(function (obj) {
      return !(
        obj.aid == action.score.aid && obj.scoreDate == action.score.scoreDate
      );
    });
    return {
      ...state,
      scores: [...tmpScores, action.score],
      loading: false,
      error: null,
    };
  }),
  on(UserActions.deleteAssessmentScoreSuccess, (state, action) => {
    console.log('deleteAssessmentScoreSuccess');
    return {
      ...state,
      scores: state.scores.filter(function (obj) {
        return !(
          obj.aid == action.score.aid && obj.scoreDate == action.score.scoreDate
        );
      }),
      loading: true,
      error: null,
    };
  }),
  on(UserActions.loadUserScoresAction, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(UserActions.loadUserScoresSuccessAction, (state, action) => ({
    ...state,
    loading: false,
    scores: action.scores,
    error: '',
  }))
);
