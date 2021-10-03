import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../../config";

@Injectable({
	providedIn: 'root'
})
export class PromotionsService {

	constructor(
		private sessionService: SessionService,
		private router: Router,
		private http: HttpClient
	) { }

	addPromotion(promotion: any): Observable<any> {
		return this.http.post(API_URL + "/add-promotion", promotion, this.sessionService.httpRequestConfig);
	}
}
