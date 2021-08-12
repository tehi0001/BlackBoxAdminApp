import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../models/product-categories";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

	dummyData: ProductCategory[] = [];

	tableDataSource: MatTableDataSource<ProductCategory>

	displayedColumns: string[] = ['sn', 'name', 'description', 'dateCreated', 'actions'];

	constructor() {
		let category: ProductCategory = {
			name: "Test Category",
			description: "This is a test category",
			dateCreated: "12 May 2021"
		}

		for (let i = 0; i < 10; i++) {
			this.dummyData.push(category);
		}

		this.tableDataSource = new MatTableDataSource<ProductCategory>(this.dummyData);
	}

	ngOnInit(): void {

	}

}
