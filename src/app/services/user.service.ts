import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../store/models/user.model";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    url = "/api/user";
    getUser(): Observable<User> {
        return this.http.get<User>(this.url);
    }

}