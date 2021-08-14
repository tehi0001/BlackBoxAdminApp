import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {ProductCategoryRequest} from "../models/product-categories";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

	constructor(
		private sessionService: SessionService,
		private http: HttpClient
	) { }

	addCategory(category: ProductCategoryRequest): Observable<any> {
		return this.http.post(API_URL + "/add-product-category", category, this.sessionService.httpRequestConfig);
	}

	editProductCategory(id: number, category: any): Observable<any> {
		return this.http.post(API_URL + "/edit-product-category/" + id, category, this.sessionService.httpRequestConfig);
	}

	getCategories(): Observable<any> {
		return this.http.get(API_URL + "/product-categories", this.sessionService.httpRequestConfig);
	}

	deleteCategory(id: number): Observable<any> {
		return this.http.post(API_URL + "/delete-product-category", {id: id}, this.sessionService.httpRequestConfig);
	}
}
