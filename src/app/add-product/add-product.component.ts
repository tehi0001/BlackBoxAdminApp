import { Component, OnInit } from '@angular/core';
import {DialogService} from "../services/dialog.service";
import {ProductCategoryService} from "../services/product-category.service";
import {ActivatedRoute, Router} from "@angular/router";
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

	formSaveMode: "edit" | "create" = "create";

	constructor(
		private dialogService: DialogService,
		private categoryService: ProductCategoryService,
		private sessionService: SessionService,
		private router: Router,
		private route: ActivatedRoute,
		private productService: ProductService
	) {
		this.addProductForm = new FormGroup({
			category: new FormControl('', [Validators.required]),
			name: new FormControl('', [Validators.required]),
			manufacturer: new FormControl('', [Validators.required]),
			price: new FormControl('', [Validators.required]),
			discount: new FormControl(''),
			stock: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required])
		})
	}

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			if(data.editMode) {
				this.formSaveMode = "edit";
			}
			this.getProductCategories();
		});
	}

	getProduct(id: number): void {
		this.productService.viewProduct(id).subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.addProductForm.controls['category'].setValue(response.data.category);
				this.addProductForm.controls['name'].setValue(response.data.product_name);
				this.addProductForm.controls['manufacturer'].setValue(response.data.manufacturer);
				this.addProductForm.controls['price'].setValue(response.data.price);
				this.addProductForm.controls['discount'].setValue(response.data.discount);
				this.addProductForm.controls['stock'].setValue(response.data.stock);
				this.addProductForm.controls['description'].setValue(response.data.description);

				this.productProperties = response.data.properties;

				// @ts-ignore
				response.data.images.forEach(image => {
					this.productImages.push(image.image);
				})

				this.loadingProductCategories = false;
			}
		}, error => {
			this.sessionService.renewSessionToken(error);
		})
	}

	getProductCategories() {
		this.categoryService.getCategories().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);
			if(response.success) {
				this.productCategories = response.data;

				if(this.formSaveMode == "edit") {
					this.route.params.subscribe(param => {
						this.getProduct(param.id);
					})
				}
				else {
					this.loadingProductCategories = false;
				}
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

	addProductProperty(property: ProductProperty): void {
		let addSuccessful: boolean = true;
		this.productProperties.forEach(prop => {
			if((prop.property_type == 'dimension' && property.property_type == 'dimension') && (prop.property_name == property.property_name)) {
				this.dialogService.notify(property.property_name + " property already added to product")
				addSuccessful = false;
			}
			else if(prop.property_name == property.property_name && prop.value == property.value) {
				this.dialogService.notify(property.property_name + " " + property.value + " property already added to product")
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
			if(prop.property_type == property.property_type && prop.property_name == property.property_name && prop.value == property.value) {
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

		if(this.formSaveMode == "create") {
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

		else if(this.formSaveMode == "edit") {
			this.route.params.subscribe(param => {
				this.productService.editProduct(param.id, product).subscribe(response => {
					response = this.sessionService.renewSessionToken(response);

					if(response.success) {
						this.dialogService.notify("Product successfully updated", "success");
						this.router.navigateByUrl("/app/products/" + param.id);
					}
					else {
						this.dialogService.notify(response.message);
					}

					this.addProductFormBusy = false;

				}, error => {
					this.sessionService.handleHttpErrors(error);
					this.addProductFormBusy = false;
				})
			})
		}
	}
}
