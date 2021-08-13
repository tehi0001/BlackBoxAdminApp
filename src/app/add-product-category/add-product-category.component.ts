import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductCategoryService} from "../services/product-category.service";
import {SessionService} from "../services/session.service";
import {DialogService} from "../services/dialog.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-add-product-category',
	templateUrl: './add-product-category.component.html',
	styleUrls: ['./add-product-category.component.scss'],
	providers: [ProductCategoryService]
})
export class AddProductCategoryComponent implements OnInit {

	addCategoryForm: FormGroup;

	addCategoryFormBusy: boolean = false;

	constructor(
		private categoryService: ProductCategoryService,
		private sessionService: SessionService,
		private dialogService: DialogService,
		private router: Router
	) {
		this.addCategoryForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required])
		})
	}

	ngOnInit(): void {
	}

	save(): void {
		this.addCategoryFormBusy = true;

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

}
