import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from "../services/session.service";
import {DialogService} from "../services/dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PromotionsService} from "../services/promotions.service";
import * as moment from 'moment';

@Component({
	selector: 'app-add-promotion',
	templateUrl: './add-promotion.component.html',
	styleUrls: ['./add-promotion.component.scss']
})
export class AddPromotionComponent implements OnInit {

	formSaveMode: "create" | "edit" = "create";

	promotionImage: any = "";

	addPromotionFormBusy: boolean = false;

	addPromotionForm: FormGroup;

	minStartDate: any = new Date();

	constructor(
		private sessionService: SessionService,
		private dialogService: DialogService,
		private promotionService: PromotionsService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location
	) {
		this.addPromotionForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required]),
			startDate: new FormControl('', [Validators.required]),
			endDate: new FormControl('', [Validators.required]),
			url: new FormControl('', [Validators.required]),
			status: new FormControl('', [Validators.required])
		});
	}

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			if (data.editMode) {
				this.formSaveMode = "edit";

				let state: any = this.location.getState();

				if(state.promotion) {
					console.log(moment(state.promotion.end_date));
					this.addPromotionForm.controls['name'].setValue(state.promotion.name);
					this.addPromotionForm.controls['description'].setValue(state.promotion.description);
					this.addPromotionForm.controls['startDate'].setValue(new Date(state.promotion.start_date));
					this.addPromotionForm.controls['endDate'].setValue(new Date(state.promotion.end_date));
					this.addPromotionForm.controls['url'].setValue(state.promotion.url);
					this.addPromotionForm.controls['status'].setValue(state.promotion.status.toString());

					this.promotionImage = state.promotion.image;

					console.log(this.addPromotionForm.invalid);
				}
				else {
					this.router.navigateByUrl("/app/promotions");
				}
			}
		});
	}

	addPromotionImage($event: any): void {
		let reader = new FileReader();
		reader.onload = () => {
			this.promotionImage =  reader.result;
		}
		reader.readAsDataURL($event.target.files[0]);
	}

	onSave() {
		this.addPromotionFormBusy = true;
		let promotion = this.addPromotionForm.value;
		promotion.image = this.promotionImage;

		let startDate = promotion.startDate.toISOString().split("T");
		let endDate = promotion.endDate.toISOString().split("T");

		promotion.startDate = startDate[0];
		promotion.endDate = endDate[0];

		if(this.formSaveMode == "edit") {
			let state: any = this.location.getState();
			this.promotionService.editPromotion(state.promotion.id, promotion).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);

				if(response.success) {
					this.dialogService.notify("Promotion successfully updated", "success");
					this.router.navigateByUrl("/app/promotions/" + state.promotion.id);
					this.addPromotionFormBusy = false;
				}

			}, error => {
				this.sessionService.handleHttpErrors(error);
				this.addPromotionFormBusy = false;
			});
		}
		else {
			this.promotionService.addPromotion(promotion).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);

				if(response.success) {
					this.dialogService.notify("Promotion successfully added", "success");
					this.router.navigateByUrl("/app/promotions");
					this.addPromotionFormBusy = false;
				}

			}, error => {
				this.sessionService.handleHttpErrors(error);
				this.addPromotionFormBusy = false;
			});
		}

	}

}
