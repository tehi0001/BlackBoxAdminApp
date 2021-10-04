import { Component, OnInit } from '@angular/core';
import {SessionService} from "../services/session.service";
import {SettingsService} from "../services/settings.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "../services/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	loadingDataFromApi: boolean = true;
	profile: any;

	hideOldPassword: boolean = true;
	hideNewPassword: boolean = true;

	showEditProfileForm: boolean = false;

	profileForm: FormGroup;
	passwordForm: FormGroup;

	profileFormBusy: boolean = false;
	passwordFormBusy: boolean = false;

	constructor(
		private sessionService: SessionService,
		private settingsService: SettingsService,
		private dialogService: DialogService,
		private router: Router
	) {
		this.profileForm = new FormGroup({
			firstname: new FormControl('', [Validators.required]),
			lastname: new FormControl('', [Validators.required])
		})

		this.passwordForm = new FormGroup({
			oldPassword: new FormControl('', [Validators.required]),
			newPassword: new FormControl('', [Validators.required])
		})
	}

	ngOnInit(): void {
		this.loadProfile();
	}

	loadProfile(): void {
		this.loadingDataFromApi = true;
		this.settingsService.getDetails().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.profile = response.data
				this.loadingDataFromApi = false;
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

	editProfile(): void {
		this.profileForm.controls['firstname'].setValue(this.profile.firstname);
		this.profileForm.controls['lastname'].setValue(this.profile.lastname);
		this.showEditProfileForm = true;
	}

	onUpdateProfile(): void {
		this.profileFormBusy = true;
		this.settingsService.updateProfile(this.profileForm.value).subscribe(response => {
			response = this.sessionService.renewSessionToken(response);
			if(response.success) {
				this.dialogService.notify("Profile successfully updated", "success");
				this.loadProfile();
				this.sessionService.user.firstname = this.profileForm.value.firstname;
				this.sessionService.user.lastname = this.profileForm.value.lastname;

				this.showEditProfileForm = false;
				this.profileFormBusy = false;
			}
		})
	}

	onChangePassword(): void {
		this.passwordFormBusy = true;

		this.settingsService.changePassword(this.passwordForm.value).subscribe(response => {
			response = this.sessionService.renewSessionToken(response);
			if(response.success) {
				this.dialogService.notify("Password successfully updated. Please sign in with your new password", "success");
				this.router.navigateByUrl("/app/logout");
			}
			else {
				this.dialogService.notify(response.message, "error");
				this.passwordFormBusy = false;
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

}
