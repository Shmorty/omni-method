import { UserService } from "src/app/api/user/user.service";
import { UserService as MockUserService } from "src/app/api/user/user.mock.service";

export const environment = {
  production: true,
  providers: [
    { provide: UserService, useClass: MockUserService },
  ],
};
