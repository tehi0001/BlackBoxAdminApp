import { Component, OnInit } from '@angular/core';
import {SessionService} from "../services/session.service";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LOW_STOCK_LIMIT} from "../../config";
import {DialogService} from "../services/dialog.service";

@Component({
	selector: 'app-view-product',
	templateUrl: './view-product.component.html',
	styleUrls: ['./view-product.component.scss'],
	providers: [ProductService]
})
export class ViewProductComponent implements OnInit {

	product: any;

	loadingDataFromApi: boolean = true;

	deleteInProgress: boolean = false;

	enlargedImageIndex: number = 0;

	productProperties: any = {
		dimensions: [],
		others: []
	}

	lowStockLimit = LOW_STOCK_LIMIT;

	constructor(
		private sessionService: SessionService,
		private productService: ProductService,
		private dialogService: DialogService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.getProduct();
	}

	getProduct():void {
		this.route.params.subscribe(param => {
			this.productService.viewProduct(param.id).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);

				if(response.success) {
					this.product = response.data;

					// @ts-ignore
					this.product.properties.forEach(prop => {
						if(prop.property_type == 'dimension') {
							this.productProperties.dimensions.push(prop);
						}
						else {
							this.productProperties.others.push(prop);
						}
					});

					this.groupProductProperties();
				}

				this.loadingDataFromApi = false;
			}, error => {
				this.sessionService.handleHttpErrors(error);
				this.loadingDataFromApi = false;
			})
		})
	}

	groupProductProperties(): void {
		let uniquePropNames: string[] = [];

		let groupedProps: any[] = [];

		// @ts-ignore
		this.productProperties.others.forEach(prop => {
			if(!uniquePropNames.includes(prop.property_name)) {
				uniquePropNames.push(prop.property_name);
				groupedProps.push({
					property_name: prop.property_name,
					values: []
				});
			}
		})

		groupedProps.forEach(group => {
			// @ts-ignore
			this.productProperties.others.forEach((prop, index) => {
				if(group.property_name == prop.property_name) {
					groupedProps[index]?.values.push(prop.value);
				}
			})
		})

		this.productProperties.others = groupedProps;
	}

	deleteProduct(id: number, name: string) {
		this.dialogService.confirm("Are you sure you want to delete " + name + "?", "Note that this action cannot be reversed")
			.subscribe(() => {
				this.deleteInProgress = true;
				this.productService.deleteProduct(id).subscribe(response => {
					if(response.success) {
						this.dialogService.notify("Product successfully deleted", "success");
						this.router.navigateByUrl("/app/products");
					}

					this.deleteInProgress = false;
				}, error => {
					this.sessionService.handleHttpErrors(error);
					this.deleteInProgress = false;
				})
			})
	}
}
