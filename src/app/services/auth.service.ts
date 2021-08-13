import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../config";
import {AuthRequest} from "../models/auth";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private sessionService: SessionService
	) { }

	auth(credentials: AuthRequest): Observable<any> {
		return this.http.post(Config.apiUrl + "/auth", credentials)
	}

	startSession(token: string) {
		this.sessionService.startSession(token);
	}
}
