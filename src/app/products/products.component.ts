import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../models/product-categories";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../models/products";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

	dummyData: Product[] = [];

	tableDataSource: MatTableDataSource<Product>

	displayedColumns: string[] = ['sn', 'name', 'description', 'dateCreated', 'actions'];

	constructor() {

		for (let i = 0; i < 10; i++) {
			let category: Product = {
				id: i + 100,
				image: "assets/dummies/product.png",
				name: "This is a test Product (123 x 234)",
				price: 200.78,
				stock: 20
			}

			this.dummyData.push(category);
		}

		this.tableDataSource = new MatTableDataSource<Product>(this.dummyData);
	}

	ngOnInit(): void {
	}

}
