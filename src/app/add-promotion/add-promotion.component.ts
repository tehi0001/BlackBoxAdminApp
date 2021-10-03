import { Component, OnInit } from '@angular/core';
import {SessionService} from "../services/session.service";
import {DialogService} from "../services/dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PromotionsService} from "../services/promotions.service";

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

		console.log(this.minStartDate);
	}

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			if (data.editMode) {
				this.formSaveMode = "edit";
			}
		});
	}

	addPromotionImage($event: any): void {
		let reader = new FileReader();
		reader.onload = () => {
			this.promotionImage =  reader.result;

			console.log(this.promotionImage.length);

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

		console.log(promotion);
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
