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

	displayedColumns: string[] = ['name', 'description', 'dateCreated', 'actions'];

	loadingDataFromApi: boolean = true;

	// @ts-ignore
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private categoryService: ProductCategoryService,
		private sessionService: SessionService,
		private dialogService: DialogService
	) {}

	ngOnInit(): void {
		this.getCategories();
	}

	getCategories(): void {
		this.categoryService.getCategories().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.tableDataSource = new MatTableDataSource<ProductCategory>(response.data);
				this.tableDataSource.paginator = this.paginator;
				this.loadingDataFromApi = false;
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

	deleteCategory(id: number, name: string): void {
		this.dialogService.confirm("Are you sure you want to delete " + name + "?", "Note that this action cannot be reversed").subscribe(() => {
			this.loadingDataFromApi = true;

			this.categoryService.deleteCategory(id).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);
				if(response.success) {
					this.dialogService.notify(name + " was successfully deleted", "success");
					this.getCategories();
				}
			}, error => {
				this.sessionService.handleHttpErrors(error);
				this.loadingDataFromApi = false;
			})
		})
	}

}
