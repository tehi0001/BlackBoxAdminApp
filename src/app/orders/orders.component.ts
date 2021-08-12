import { Component, OnInit } from '@angular/core';
import {Product} from "../models/products";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../models/orders";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
	dummyData: Order[] = [];

	tableDataSource: MatTableDataSource<Order>

	displayedColumns: string[] = ['id', 'billingName', 'date', 'total', 'paymentMethod', 'actions'];

	constructor() {

		for (let i = 0; i < 10; i++) {
			let category: Order = {
				id: i + 100,
				date: "12 May 2020 10:15 am",
				billing_name: "John Doe",
				total: 2000.78,
				payment_method: "Instant EFT"
			}

			this.dummyData.push(category);
		}

		this.tableDataSource = new MatTableDataSource<Order>(this.dummyData);
	}

  ngOnInit(): void {
  }

}
