import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductCategoryService} from "../services/product-category.service";
import {SessionService} from "../services/session.service";
import {DialogService} from "../services/dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
	selector: 'app-add-product-category',
	templateUrl: './add-product-category.component.html',
	styleUrls: ['./add-product-category.component.scss'],
	providers: [ProductCategoryService]
})
export class AddProductCategoryComponent implements OnInit {

	addCategoryForm: FormGroup;

	addCategoryFormBusy: boolean = false;

	formSaveMode: "create" | "edit" = "create";

	constructor(
		private categoryService: ProductCategoryService,
		private sessionService: SessionService,
		private dialogService: DialogService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location
	) {
		this.addCategoryForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required])
		})
	}

	ngOnInit(): void {


		this.route.data.subscribe(data => {
			if(data.editMode) {
				this.formSaveMode = "edit";

				let state: any = this.location.getState();

				if(state.category) {
					this.addCategoryForm.setValue({
						name: state.category.category_name,
						description: state.category.description
					});
				}
				else {
					this.router.navigateByUrl("/app/product-categories");
				}
			}
		})
	}

	save(): void {
		this.addCategoryFormBusy = true;

		if(this.formSaveMode == "create") {
			this.categoryService.addCategory(this.addCategoryForm.value).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);

				if(response.success) {
					this.dialogService.notify("Product category successfully added", "success");
					this.router.navigateByUrl("/app/product-categories");
				}
				else {
					this.dialogService.notify(response.message);
				}
				this.addCategoryFormBusy = false;
			}, error => {
				this.dialogService.showServerErrorMessage();
				this.addCategoryFormBusy = false;
			})
		}
		else if (this.formSaveMode == "edit") {
			this.route.params.subscribe(params => {
				this.categoryService.editProductCategory(params.id, this.addCategoryForm.value).subscribe(response => {
					response = this.sessionService.renewSessionToken(response);
					if(response.success) {
						this.dialogService.notify("Category successfully edited", "success");
						this.router.navigateByUrl("/app/product-categories");
					}
					else {
						this.dialogService.notify(response.message);
					}

					this.addCategoryFormBusy = false;
				}, error => {
					this.dialogService.showServerErrorMessage();
					this.addCategoryFormBusy = false;
				})
			})
		}
	}

}
