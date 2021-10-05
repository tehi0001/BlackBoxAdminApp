import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

	constructor(
		private sessionService: SessionService,
		private http: HttpClient
	) { }

	getData(): Observable<any> {
		return this.http.get(API_URL + "/dashboard", this.sessionService.httpRequestConfig);
	}
}
