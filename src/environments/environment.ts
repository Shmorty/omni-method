// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { UserService } from 'src/app/api/user/user.service';
// import { UserService as MockUserService } from 'src/app/api/user/user.mock.service';

export const environment = {
  production: false,
  firebase: {
    projectId: 'omni-login-63e9f',
    appId: '1:164197842062:web:46db489e022b2d686e5ddf',
    storageBucket: 'omni-login-63e9f.appspot.com',
    apiKey: 'AIzaSyAEY7uvt7JvWOtvxTP46sU1wZuZ7PfcWps',
    authDomain: 'omni-login-63e9f.firebaseapp.com',
    messagingSenderId: '164197842062',
  },
  // providers: [{ provide: UserService, useClass: MockUserService }],
  providers: [UserService],
  // production: FontFaceSetLoadEvent,
  API_KEY: '',
  // API_URL : 'https://api.shmorty.com/omnimethod/v1/'
  API_URL: 'https://jsonplaceholder.typicode.com/todos/1',
  // dev
  // baseUrl: 'https://7crsalgmhk.execute-api.us-east-1.amazonaws.com',
  // uat/pre-prod
  baseUrl: 'https://4aupny9zf2.execute-api.us-east-1.amazonaws.com',

  gapi_client_id:
    '677058047401-jf9aa0tuvobl14v8u07lvfa5ef7a3tct.apps.googleusercontent.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
