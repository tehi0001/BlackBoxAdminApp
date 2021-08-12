import { Component, OnInit } from '@angular/core';
import {Customer} from "../models/customers";
import {MatTableDataSource} from "@angular/material/table";
import {DeliveryCategory} from "../models/shipping-costs";

@Component({
  selector: 'app-shipping-costs',
  templateUrl: './shipping-costs.component.html',
  styleUrls: ['./shipping-costs.component.scss']
})
export class ShippingCostsComponent implements OnInit {

	dummyData: DeliveryCategory[] = [];

	tableDataSource: MatTableDataSource<DeliveryCategory>

	displayedColumns: string[] = ['name', 'description', 'conditions', 'cost', 'actions'];

	constructor() {

		for (let i = 0; i < 10; i++) {
			let category: DeliveryCategory = {
				id: i + 100,
				name: "Express Delivery",
				description: "Test delivery category",
				conditions: "Order before 4pm",
				cost: 250
			}

			this.dummyData.push(category);
		}

		this.tableDataSource = new MatTableDataSource<DeliveryCategory>(this.dummyData);
	}

	ngOnInit(): void {
	}

}
