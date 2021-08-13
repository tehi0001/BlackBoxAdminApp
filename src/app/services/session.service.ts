import { Injectable } from '@angular/core';

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
}
