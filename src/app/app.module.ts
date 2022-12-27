import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { StoreModule, MetaReducer } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { storeFreeze } from 'ngrx-store-freeze';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { assessmentReducer } from './store/reducers/assessment.reducer';
import { FormsModule } from '@angular/forms';
// import { userReducer } from './store/reducers/user.reducer';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ShowHidePasswordModule } from './component/show-hide-password/show-hide-password.module';
import { ShowHidePasswordComponent } from './component/show-hide-password/show-hide-password.component';

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
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => initializeApp,
    // },
    ...environment.providers,
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
