import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Customer} from "../models/customers";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {SessionService} from "../services/session.service";
import {DialogService} from "../services/dialog.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

	// @ts-ignore
	customer: Customer;

	deletingCustomer: boolean = false;
	editingCustomer: boolean = false;

	showEditForm: boolean = false;

	// @ts-ignore
	editCustomerForm: FormGroup;

	constructor(
		private location: Location,
		private router: Router,
		private route: ActivatedRoute,
		private userService: UsersService,
		private sessionService: SessionService,
		private dialogService: DialogService
	) {	}

	ngOnInit(): void {
		let state = this.location.getState();

		// @ts-ignore
		if(state.customer) {
			// @ts-ignore
			this.customer = state.customer;
			this.editCustomerForm = new FormGroup({
				firstname: new FormControl(this.customer.firstname, [Validators.required]),
				lastname: new FormControl(this.customer.lastname, [Validators.required]),
				email: new FormControl(this.customer.email, [Validators.required, Validators.email]),
				status: new FormControl(this.customer.status.toString(), [Validators.required])
			})
		}
		else {
			this.router.navigateByUrl("/app/customers");
		}
	}

	onDelete(): void {
		this.dialogService.confirm("Are you sure you want to delete " + this.customer.firstname + " " + this.customer.lastname + "?",
			"Please note that this action cannot be reversed")
			.subscribe(() => {
				this.deletingCustomer = true
				this.userService.deleteUser(this.customer.id).subscribe(response => {
					response = this.sessionService.renewSessionToken(response);
					if(response.success) {
						this.dialogService.notify(this.customer.firstname + " " + this.customer.lastname + " was successfully deleted", "success");
						this.router.navigateByUrl("/app/customers");
					}
				}, error => {
					this.sessionService.handleHttpErrors(error);
				})
			})
	}

	onEdit() {
		this.editingCustomer = true;
		this.userService.editUser(this.customer.id, this.editCustomerForm.value).subscribe(response => {
			response = this.sessionService.renewSessionToken(response);
			if(response.success) {
				this.customer.firstname = this.editCustomerForm.value.firstname;
				this.customer.lastname = this.editCustomerForm.value.lastname;
				this.customer.email = this.editCustomerForm.value.email;
				this.customer.status = this.editCustomerForm.value.status;

				this.dialogService.notify("Customer details successfully updated", "success");

				this.editingCustomer = false;
				this.showEditForm = false;
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

}
