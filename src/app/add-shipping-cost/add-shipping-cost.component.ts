import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShippingCategoryService} from "../services/shipping-category.service";
import {SessionService} from "../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../services/dialog.service";
import {Location} from "@angular/common";

@Component({
	selector: 'app-add-shipping-cost',
	templateUrl: './add-shipping-cost.component.html',
	styleUrls: ['./add-shipping-cost.component.scss'],
	providers: [ShippingCategoryService]
})
export class AddShippingCostComponent implements OnInit {

	shippingCostForm: FormGroup;

	shippingCostFormBusy: boolean = false;

	formSaveMode: "edit" | "create" = "create";

	constructor(
		private categoryService: ShippingCategoryService,
		private sessionService: SessionService,
		private dialogService: DialogService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location
	) {
		this.shippingCostForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required]),
			conditions: new FormControl(''),
			cost: new FormControl('', [Validators.required])
		})
	}

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			if(data.editMode) {
				this.formSaveMode = "edit";

				let state: any = this.location.getState();

				if(state.shippingCategory) {
					this.shippingCostForm.setValue({
						name: state.shippingCategory.category_name,
						description: state.shippingCategory.description,
						conditions: state.shippingCategory.conditions,
						cost: state.shippingCategory.cost
					});
				}
				else {
					this.router.navigateByUrl("/app/shipping-costs");
				}
			}
		})
	}

	save(): void {
		this.shippingCostFormBusy = true;

		if(this.formSaveMode == "create") {
			this.categoryService.addCategory(this.shippingCostForm.value).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);

				if(response.success) {
					this.dialogService.notify("Shipping category successfully added", "success");
					this.router.navigateByUrl("/app/shipping-costs");
				}
				else {
					this.dialogService.notify(response.message);
				}

				this.shippingCostFormBusy = false
			}, error => {
				this.sessionService.handleHttpErrors(error);
				this.shippingCostFormBusy = false;
			})
		}
		else if(this.formSaveMode == "edit") {
			this.route.params.subscribe(params => {
				this.categoryService.editCategory(params.id, this.shippingCostForm.value).subscribe(response => {
					response = this.sessionService.renewSessionToken(response);

					if(response.success) {
						this.dialogService.notify("Shipping category successfully updated", "success");
						this.router.navigateByUrl("/app/shipping-costs");
					}
					else {
						this.dialogService.notify(response.message);
					}

					this.shippingCostFormBusy = false;
				}, error => {
					this.sessionService.handleHttpErrors(error);
					this.shippingCostFormBusy = false;
				})
			})
		}
	}

}
