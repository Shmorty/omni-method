import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule, IonVirtualScroll} from '@ionic/angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {FirebaseApp, getApp, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {DatePipe} from '@angular/common';
import {AuthService} from './services/auth.service';
import {from} from 'rxjs';
import {take} from 'rxjs/operators';
import {
  provideAuth,
  getAuth,
  initializeAuth,
  indexedDBLocalPersistence,
} from '@angular/fire/auth';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducers} from './store/app.state';
import {AssessmentEffects} from './store/assessments/assessment.effects';
import {UserEffects} from './store/user/user.effect';
import {OmniScoreEffects} from './store/omni-score/omni-score.effects';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {Capacitor} from '@capacitor/core';
import {UserActionType} from './store/user/user.actions';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

function clearState(reducer) {
  return function (state, action) {
    if (action.type === UserActionType.USER_LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  }
}
function logout(reducer) {
  return function (state, action) {
    return reducer(action.type === UserActionType.USER_LOGOUT ? undefined : state, action);
  }
}

export const metaReducers: MetaReducer<any>[] = []; // [clearState, debug];
// export const storeDevTools: ModuleWithProviders[] =
//     !environment.production ? [StoreDevtoolsModule.instrument()] : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AssessmentEffects, UserEffects, OmniScoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        console.log('isNativePlatform');
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence,
        });
      } else {
        console.log('not nativPlatform');
        return getAuth();
      }
    }),
  ],
  providers: [
    // ...environment.providers,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: checkUserStatus,
    //   deps: [AuthService],
    //   multi: true,
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useFactory: (auth: AuthService) => {
    //     return () => {
    //       var user = from(auth.currentUser());
    //       return user.pipe(take(1));
    //     };
    //   },
    //   deps: [AuthService],
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useFactory: (userService: UserService, auth: AuthService) => {
    //     return () => {
    //       console.log('currUser.id: ' + auth.currUser.id);
    //       return userService.getUser(auth.currUser.id);
    //     };
    //   },
    //   deps: [UserService],
    // },
    DatePipe,
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
