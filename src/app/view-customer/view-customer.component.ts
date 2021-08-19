import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Customer} from "../models/customers";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

	// @ts-ignore
	customer: Customer;

	constructor(
		private location: Location,
		private router: Router
	) {	}

	ngOnInit(): void {
		let state = this.location.getState();

		// @ts-ignore
		if(state.customer) {
			// @ts-ignore
			this.customer = state.customer;
		}
		else {
			this.router.navigateByUrl("/app/customers");
		}
	}

}
