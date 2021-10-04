import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {DialogService} from "../services/dialog.service";
import {SessionService} from "../services/session.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [AuthService]
})
export class LoginComponent implements OnInit {
	hidePasswordFieldText: boolean = true;

	authForm: FormGroup;

	authFormBusy: boolean = false;

	constructor(
		private authService: AuthService,
		private router: Router,
		private dialogService: DialogService,
		private sessionService: SessionService
	) {
		this.authForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		})
	}

	ngOnInit(): void {

	}

	auth(): void {
		this.authFormBusy = true;

		this.authService.auth(this.authForm.value).subscribe(response => {
			if(response.success) {
				this.authService.startSession(response.token);
				this.sessionService.user = response.data;
				this.router.navigateByUrl("/app");
			}
			else {
				this.dialogService.notify(response.message);
			}

			this.authFormBusy = false
		}, error => {
			this.sessionService.handleHttpErrors(error);
			this.authFormBusy = false;
		})
	}

}
