import { UserService } from 'src/app/services/user/user.service';
// import { UserService as MockUserService } from "src/app/api/user/user.mock.service";

export const environment = {
  firebase: {
    projectId: 'omni-login-63e9f',
    appId: '1:164197842062:web:46db489e022b2d686e5ddf',
    storageBucket: 'omni-login-63e9f.appspot.com',
    apiKey: 'AIzaSyAEY7uvt7JvWOtvxTP46sU1wZuZ7PfcWps',
    authDomain: 'omni-login-63e9f.firebaseapp.com',
    messagingSenderId: '164197842062',
  },
  production: true,
  // providers: [{ provide: UserService, useClass: MockUserService }],
  providers: [UserService],
};
