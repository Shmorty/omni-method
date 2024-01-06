import {UserService} from 'src/app/services/user/user.service';
// import { UserService as MockUserService } from "src/app/api/user/user.mock.service";

export const environment = {
  firebase: {
    projectId: "omni-method",
    appId: "1:93730997469:web:ebe8daccb9dd7c6ae88734",
    storageBucket: "omni-method.appspot.com",
    apiKey: "AIzaSyCpMl6OQngvZmYTZW3MasJ4jbQvLJYGSNI",
    authDomain: "omni-method.firebaseapp.com",
    messagingSenderId: "93730997469",
    measurementId: "G-G67RVQF0RX"
  },
  production: true,
  // providers: [{ provide: UserService, useClass: MockUserService }],
  providers: [UserService],
};
