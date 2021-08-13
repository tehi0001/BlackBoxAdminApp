import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

	sessionToken: string | null;

	isLoggedIn: boolean = false;

	constructor() {
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
}
