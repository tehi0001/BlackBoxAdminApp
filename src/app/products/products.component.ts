import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../models/products";
import {DialogService} from "../services/dialog.service";
import {SessionService} from "../services/session.service";
import {ProductService} from "../services/product.service";
import {MatPaginator} from "@angular/material/paginator";
import {LOW_STOCK_LIMIT} from "../../config";

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
	providers: [ProductService]
})
export class ProductsComponent implements OnInit {

	// @ts-ignore
	@ViewChild(MatPaginator) paginator: MatPaginator;

	loadingProductsFromApi: boolean = true;

	// @ts-ignore
	tableDataSource: MatTableDataSource<Product>

	displayedColumns: string[] = ['sn', 'name', 'category', 'description', 'dateCreated', 'actions'];

	lowStockLimit = LOW_STOCK_LIMIT;

	constructor(
		private dialogService: DialogService,
		private sessionService: SessionService,
		private productService: ProductService
	) {
		this.getProducts();
	}

	ngOnInit(): void {
	}

	getProducts(): void {
		this.productService.getProducts().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.tableDataSource = new MatTableDataSource<Product>(response.data);
				this.tableDataSource.paginator = this.paginator;

				this.loadingProductsFromApi = false;
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

	applyFilter(event: Event)  {
		const filterValue = (event.target as HTMLInputElement).value;
		this.tableDataSource.filter = filterValue.trim().toLowerCase();
	}

}
