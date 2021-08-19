import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {API_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

	constructor(
		private http: HttpClient,
		private sessionService: SessionService
	) { }

	getUsers(): Observable<any> {
		return this.http.get(API_URL + "/users", this.sessionService.httpRequestConfig);
	}

	deleteUser(id: number): Observable<any> {
		return this.http.post(API_URL + "/delete-user", {id: id}, this.sessionService.httpRequestConfig);
	}
}
