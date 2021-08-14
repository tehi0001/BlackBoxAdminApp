import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthRequest} from "../models/auth";
import {SessionService} from "./session.service";
import {API_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private sessionService: SessionService
	) { }

	auth(credentials: AuthRequest): Observable<any> {
		return this.http.post(API_URL + "/auth", credentials)
	}

	startSession(token: string) {
		this.sessionService.startSession(token);
	}
}
