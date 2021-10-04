import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	constructor(
		private sessionService: SessionService,
		private http: HttpClient
	) { }

	getDetails(): Observable<any> {
		return this.http.get(API_URL + "/profile", this.sessionService.httpRequestConfig);
	}
	updateProfile(data: any): Observable<any> {
		return this.http.post(API_URL + "/edit-profile", data, this.sessionService.httpRequestConfig);
	}
	changePassword(data: any): Observable<any> {
		return this.http.post(API_URL + "/change-password", data, this.sessionService.httpRequestConfig);
	}
}
