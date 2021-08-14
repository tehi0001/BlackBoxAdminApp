import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {API_URL} from "../../config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShippingCategoryService {

	constructor(
		private sessionService: SessionService,
		private router: Router,
		private http: HttpClient
	) { }

	editCategory(id: number, category: any): Observable<any> {
		return this.http.post(API_URL + "/edit-shipping-category/" + id, category, this.sessionService.httpRequestConfig);
	}

	addCategory(category: any): Observable<any> {
		return this.http.post(API_URL + "/add-shipping-category", category, this.sessionService.httpRequestConfig);
	}

	getCategories(): Observable<any> {
		return this.http.get(API_URL + "/shipping-categories", this.sessionService.httpRequestConfig);
	}
	deleteCategory(id: number): Observable<any> {
		return this.http.post(API_URL + "/delete-shipping-category", {id: id}, this.sessionService.httpRequestConfig);
	}

}
