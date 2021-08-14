import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../models/customers";
import {MatTableDataSource} from "@angular/material/table";
import {DeliveryCategory} from "../models/shipping-costs";
import {ShippingCategoryService} from "../services/shipping-category.service";
import {SessionService} from "../services/session.service";
import {DialogService} from "../services/dialog.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
	selector: 'app-shipping-costs',
	templateUrl: './shipping-costs.component.html',
	styleUrls: ['./shipping-costs.component.scss'],
	providers: [ShippingCategoryService]
})
export class ShippingCostsComponent implements OnInit {

	loadingDataFromApi: boolean = true;

	// @ts-ignore
	tableDataSource: MatTableDataSource<DeliveryCategory>

	displayedColumns: string[] = ['name', 'description', 'conditions', 'cost', 'actions'];

	// @ts-ignore
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private sessionService: SessionService,
		private shippingService: ShippingCategoryService,
		private dialogService: DialogService
	) {}

	ngOnInit(): void {
		this.getCategories();
	}

	getCategories(): void {
		this.shippingService.getCategories().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.tableDataSource = new MatTableDataSource<DeliveryCategory>(response.data);
				this.tableDataSource.paginator = this.paginator;

				this.loadingDataFromApi = false;
			}
		})
	}

	deleteCategory(id: number, name: string): void {
		this.dialogService.confirm("Are you sure you want to delete " + name + "?", "Note that this action cannot be reversed").subscribe(() => {
			this.loadingDataFromApi = true;

			this.shippingService.deleteCategory(id).subscribe(response => {
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
