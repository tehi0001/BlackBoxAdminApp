import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {ProductCategoryRequest} from "../models/product-categories";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

	constructor(
		private sessionService: SessionService,
		private http: HttpClient
	) { }

	addCategory(category: ProductCategoryRequest): Observable<any> {
		return this.http.post(Config.apiUrl + "/add-product-category", category, this.sessionService.httpRequestConfig);
	}
}
