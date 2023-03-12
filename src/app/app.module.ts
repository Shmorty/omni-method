import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ShowHidePasswordModule } from './component/show-hide-password/show-hide-password.module';
import { ShowHidePasswordComponent } from './component/show-hide-password/show-hide-password.component';
import { DatePipe } from '@angular/common';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user/user.service';
import { from } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { user } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/app.state';
import { AssessmentEffects } from './store/assessments/assessment.effects';
import { UserEffects } from './store/user/user.effect';
import { OmniScoreEffects } from './store/omni-score/omni-score.effects';

// export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
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
    NgxSkeletonLoaderModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AssessmentEffects, UserEffects, OmniScoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
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
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (auth: AuthService) => {
        return () => {
          var user = from(auth.currentUser());
          return user.pipe(take(1));
        };
      },
      deps: [AuthService],
    },
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
