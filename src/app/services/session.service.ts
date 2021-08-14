import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {DialogService} from "./dialog.service";
import {NETWORK_ERROR_MESSAGE, SERVER_ERROR_MESSAGE, SESSION_UNAUTHORIZED_MESSAGE} from "../../config";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

	sessionToken: string | null;

	isLoggedIn: boolean = false;

	constructor(
		private dialogService: DialogService,
		private router: Router
	) {
		this.sessionToken = null;
	}

	startSession(token: string): void {
		this.sessionToken = token;
		this.isLoggedIn = true;
		sessionStorage.setItem("sessionToken", token);
	}

	hasActiveSession(): boolean {
		let storedSession: string | null = sessionStorage.getItem("sessionToken");

		if(storedSession == null) {
			return false;
		}

		this.sessionToken = storedSession;
		this.isLoggedIn = true;

		return true;
	}

	endSession() {
		this.sessionToken = null;
		sessionStorage.clear();
		this.isLoggedIn = false;
	}

	get httpRequestConfig(): any {
		return {
			headers: new HttpHeaders({
				Authorization: "Bearer " + this.sessionToken
			})
		}
	}

	renewSessionToken(response: any): any {
		if (response.token) {
			this.startSession(response.token);
		}

		return response;
	}

	handleHttpErrors(error: HttpErrorResponse): void {

		if(error.error instanceof ErrorEvent) { //Client side error
			this.dialogService.notify(NETWORK_ERROR_MESSAGE)
		}
		else if(error.status == 401) {
			this.dialogService.notify(SESSION_UNAUTHORIZED_MESSAGE)
			this.router.navigateByUrl("/app/logout");
		}
		else {
			this.dialogService.notify(SERVER_ERROR_MESSAGE);
		}
	}
}
