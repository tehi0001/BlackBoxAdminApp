import { Component } from '@angular/core';
import {SessionService} from "./services/session.service";
import {Router} from "@angular/router";
import {SettingsService} from "./services/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private sessionService: SessionService,
		private router: Router,
		settingsService: SettingsService
	) {
		if(sessionService.hasActiveSession()) {
			settingsService.getDetails().subscribe(response => {
				response = sessionService.renewSessionToken(response);
				if(response.success) {
					sessionService.user = response.data;
				}
			})
		}
	}
}
