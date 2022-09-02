import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { OAuthModule } from 'angular-oauth2-oidc'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { assessmentReducer } from './store/reducers/assessment.reducer';
import { FormsModule } from '@angular/forms';
import { userReducer } from './store/reducers/user.reducer';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({
      // user: userReducer,
      assessments: assessmentReducer
    }),
    EffectsModule.forRoot([]),
    // storeDevTools,
    // OAuthModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
