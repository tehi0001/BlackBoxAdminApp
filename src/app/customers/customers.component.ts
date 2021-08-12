import { Component, OnInit } from '@angular/core';
import {Product} from "../models/products";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../models/customers";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

	dummyData: Customer[] = [];

	tableDataSource: MatTableDataSource<Customer>

	displayedColumns: string[] = ['sn', 'name', 'email', 'city_province', 'totalSpend', 'joindate', 'isRegistered', 'actions'];

	constructor() {

		for (let i = 0; i < 10; i++) {
			let customer: Customer = {
				id: i + 100,
				firstname: "John",
				lastname: "Doe",
				email: "johndoe@gmail.com",
				city: "Johannesburg",
				province: "GP",
				total_spend: 406229.76,
				is_registered: (i % 2) == 0 ? true : false,
				joindate: "12 May 2021 09:41 pm"
			}

			this.dummyData.push(customer);
		}

		this.tableDataSource = new MatTableDataSource<Customer>(this.dummyData);
	}

  ngOnInit(): void {
  }

}
