import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

	sessionId: string | null;

	isLoggedIn: boolean = false;

	constructor() {
		this.sessionId = null;
	}

	startSession(token: string): void {
		this.sessionId = token;
		this.isLoggedIn = true;
		sessionStorage.setItem("sessionId", token);
	}

	endSession() {
		this.sessionId = null;
		sessionStorage.clear();
		this.isLoggedIn = false;
	}
}
