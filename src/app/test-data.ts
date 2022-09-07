import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { User } from "./store/models/user.model";

const initialUserState: User = {
    id: 0,
    email: 'jack@lalane.not',
    firstName: 'Francois',
    lastName: 'LaLanne',
    nickname: 'Jack',
    dob: new Date("1914-09-26"),
    weight: 155,
}

export class TestData implements InMemoryDbService {
    createDb() {
        let userDetails = initialUserState;
        return { user: userDetails };
    }
}

// export class TestData implements InMemoryDbService {
//   createDb() {
//     let articleDetails = [
//       {id: '1', title: 'Core Java Tutorial', category: 'Java'},
//       {id: '2', title: 'Angular Tutorial', category: 'Angular'},
//       {id: '3', title: 'Hibernate Tutorial', category: 'Hibernate'}
//     ];
//     return { articles: articleDetails };
//   }
// } 