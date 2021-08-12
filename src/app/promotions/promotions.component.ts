import { Component, OnInit } from '@angular/core';
import {DeliveryCategory} from "../models/shipping-costs";
import {MatTableDataSource} from "@angular/material/table";
import {Promotion} from "../models/promotions";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

	dummyData: Promotion[] = [];

	tableDataSource: MatTableDataSource<Promotion>

	displayedColumns: string[] = ['name', 'description', 'dateCreated', 'startDate', 'endDate', 'actions'];

	constructor() {

		for (let i = 0; i < 10; i++) {
			let promotion: Promotion = {
				id: i + 100,
				name: "Back to School 2020",
				description: "20% off all back to school stationery",
				date_created: "10 May 2020",
				start_date: "01 Jun 2021",
				end_date: "10 Jul 2021"
			}

			this.dummyData.push(promotion);
		}

		this.tableDataSource = new MatTableDataSource<Promotion>(this.dummyData);
	}

  ngOnInit(): void {
  }

}
