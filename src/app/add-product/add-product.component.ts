import { Component, OnInit } from '@angular/core';
import {DialogService} from "../services/dialog.service";
import {ProductCategoryService} from "../services/product-category.service";
import {Router} from "@angular/router";
import {ProductCategory} from "../models/product-categories";
import {SessionService} from "../services/session.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductProperty} from "../models/products";
import {ProductService} from "../services/product.service";

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.scss'],
	providers: [ProductCategoryService, ProductService]
})
export class AddProductComponent implements OnInit {

	// @ts-ignore
	productCategories: ProductCategory[];

	productProperties: ProductProperty[] = [];

	productImages: any[] = [];

	selectedProductImageIndex: number = 0;

	loadingProductCategories: boolean = true;

	addProductForm: FormGroup;

	showAddPropertyForm: boolean = false;

	addProductFormBusy: boolean = false;

	constructor(
		private dialogService: DialogService,
		private categoryService: ProductCategoryService,
		private sessionService: SessionService,
		private router: Router,
		private productService: ProductService
	) {
		this.addProductForm = new FormGroup({
			category: new FormControl('', [Validators.required]),
			name: new FormControl('', [Validators.required]),
			manufacturer: new FormControl('', [Validators.required]),
			price: new FormControl('', [Validators.required]),
			discount: new FormControl('', [Validators.required]),
			stock: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required])
		})
	}

	ngOnInit(): void {
		this.getProductCategories();
	}

	getProductCategories() {
		this.categoryService.getCategories().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);
			if(response.success) {
				this.productCategories = response.data;
				this.loadingProductCategories = false;
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

	addProductProperty(property: ProductProperty): void {
		let addSuccessful: boolean = true;
		this.productProperties.forEach(prop => {
			if((prop.type == 'dimension' && property.type == 'dimension') && (prop.name == property.name)) {
				this.dialogService.notify(property.name + " property already added to product")
				addSuccessful = false;
			}
			else if(prop.name == property.name && prop.value == property.value) {
				this.dialogService.notify(property.name + " " + property.value + " property already added to product")
				addSuccessful = false;
			}
		})

		if(addSuccessful) {
			this.productProperties.push(property);
		}

		this.showAddPropertyForm = false;
	}

	deleteProductProperty(property: ProductProperty): void {
		this.productProperties.forEach((prop, index) => {
			if(prop.type == property.type && prop.name == property.name && prop.value == property.value) {
				this.productProperties.splice(index, 1);
			}
		})
	}

	addProductImage($event: any): void {
		let reader = new FileReader();
		reader.onload = () => {
			let result = reader.result;
			if(this.productImages.includes(result)) {
				this.dialogService.notify("Selected picture is already added");
			}
			else {
				this.productImages.push(result);
			}
		}

		reader.readAsDataURL($event.target.files[0]);
	}

	deleteSelectedProductImage(): void {
		this.productImages.splice(this.selectedProductImageIndex, 1);

		this.selectedProductImageIndex = 0;
	}

	saveProduct():void {
		this.addProductFormBusy = true;
		let product = this.addProductForm.value;
		product.properties = this.productProperties;
		product.images = this.productImages;

		this.productService.addProduct(product).subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.dialogService.notify("Product successfully added", "success");
				this.router.navigateByUrl("/app/products");
			}
			else {
				this.dialogService.notify(response.message);
			}

			this.addProductFormBusy = false;

		}, error => {
			this.sessionService.handleHttpErrors(error);
			this.addProductFormBusy = false;
		})
	}
}
