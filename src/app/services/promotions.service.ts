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

	getAll(): Observable<any> {
		return this.http.get(API_URL + "/promotions", this.sessionService.httpRequestConfig);
	}

	getOne(id: number): Observable<any> {
		return this.http.get(API_URL + "/promotions/" + id, this.sessionService.httpRequestConfig);
	}

	addPromotion(promotion: any): Observable<any> {
		return this.http.post(API_URL + "/add-promotion", promotion, this.sessionService.httpRequestConfig);
	}

	editPromotion(id: number, data: any): Observable<any> {
		return this.http.post(API_URL + "/edit-promotion/" + id, data, this.sessionService.httpRequestConfig);
	}

	delete(id: number): Observable<any> {
		return this.http.post(API_URL + "/delete-promotion", {id: id}, this.sessionService.httpRequestConfig);
	}
}
