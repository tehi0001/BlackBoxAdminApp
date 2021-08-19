import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../../config";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

	constructor(
		private router: Router,
		private http: HttpClient,
		private sessionService: SessionService
	) { }

	getOrders(): Observable<any> {
		return this.http.get(API_URL + "/orders", this.sessionService.httpRequestConfig);
	}

	getOrder(id: number): Observable<any> {
		return this.http.get(API_URL + "/view-order/" + id, this.sessionService.httpRequestConfig);
	}

	changeOrderStatus(id: number, status: number): Observable<any> {
		return this.http.post(API_URL + "/change-order-status/", {
			id: id,
			status: status
		}, this.sessionService.httpRequestConfig);
	}

	deleteOrder(id: number): Observable<any> {
		return this.http.post(API_URL + "/delete-order/", { id: id }, this.sessionService.httpRequestConfig);
	}
}
