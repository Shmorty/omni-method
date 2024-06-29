import {provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from '@ionic/angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {getApp, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {DatePipe} from '@angular/common';
import {
  provideAuth,
  getAuth,
  initializeAuth,
  indexedDBLocalPersistence,
} from '@angular/fire/auth';
import {getStorage, provideStorage} from '@angular/fire/storage';
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
import {NgApexchartsModule} from 'ng-apexcharts';
import {CommunityEffects} from './store/community/community.effect';
import {getAnalytics, provideAnalytics, ScreenTrackingService} from '@angular/fire/analytics';
import {loggingInterceptor} from './services/storage/storage.service';

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
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    NgApexchartsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AssessmentEffects, UserEffects, OmniScoreEffects, CommunityEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true
    }),
  ],
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([loggingInterceptor])
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        console.log('isNativePlatform');
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence,
        });
      }
      else {
        console.log('not nativPlatform');
        return getAuth();
      }
    }),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    DatePipe,
    ScreenTrackingService,
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class AppModule {}
