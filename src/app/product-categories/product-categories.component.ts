import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductCategory} from "../models/product-categories";
import {MatTableDataSource} from "@angular/material/table";
import {ProductCategoryService} from "../services/product-category.service";
import {SessionService} from "../services/session.service";
import {DialogService} from "../services/dialog.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
	// @ts-ignore
	tableDataSource: MatTableDataSource<ProductCategory>;

	displayedColumns: string[] = ['sn', 'name', 'description', 'dateCreated', 'actions'];

	loadingDataFromApi: boolean = true;

	// @ts-ignore
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private categoryService: ProductCategoryService,
		private sessionService: SessionService,
		private dialogService: DialogService
	) {}

	ngOnInit(): void {
		this.getTransactions();
	}

	getTransactions(): void {
		this.categoryService.getCategories().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.tableDataSource = new MatTableDataSource<ProductCategory>(response.data);
				this.tableDataSource.paginator = this.paginator;
				this.loadingDataFromApi = false;
			}
		}, error => {
			this.dialogService.showServerErrorMessage();
		})
	}

}
