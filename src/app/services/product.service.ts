import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../../config";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

	constructor(
		private http: HttpClient,
		private sessionService: SessionService
	) { }

	addProduct(product: any) :Observable<any> {
		return this.http.post(API_URL + "/add-product", product, this.sessionService.httpRequestConfig);
	}

	getProducts(): Observable<any> {
		return this.http.get(API_URL + "/products", this.sessionService.httpRequestConfig);
	}
}
