import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { OAuthModule } from 'angular-oauth2-oidc'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { storeFreeze } from 'ngrx-store-freeze';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { assessmentReducer } from './store/reducers/assessment.reducer';
import { FormsModule } from '@angular/forms';
import { userReducer } from './store/reducers/user.reducer';

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
        StoreModule.forRoot({
            // user: userReducer,
            assessments: assessmentReducer
        }),
        EffectsModule.forRoot([]),
        // storeDevTools,
        // OAuthModule.forRoot()
    ],
    providers: [
        ...environment.providers,
        // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
