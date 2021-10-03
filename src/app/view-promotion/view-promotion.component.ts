import { Component, OnInit } from '@angular/core';
import {PromotionsService} from "../services/promotions.service";
import {SessionService} from "../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../services/dialog.service";

@Component({
  selector: 'app-view-promotion',
  templateUrl: './view-promotion.component.html',
  styleUrls: ['./view-promotion.component.scss']
})
export class ViewPromotionComponent implements OnInit {

	serverBusy: boolean = true;

	deletingPromotion: boolean = false;

	promotion: any

	constructor(
		private promotionService: PromotionsService,
		private sessionService: SessionService,
		private route: ActivatedRoute,
		private router: Router,
		private dialogService: DialogService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(param => {
			this.promotionService.getOne(param.id).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);
				if(response.success) {
					this.promotion = response.data;
					this.serverBusy = false;
				}
			}, error => {
				this.sessionService.handleHttpErrors(error);
			})
		})
	}

	onDelete(): void {
		this.dialogService.confirm("Are you sure you want to delete this promotion?", "Note that this action cannot be reversed").subscribe(() => {
			this.deletingPromotion = true;
			this.promotionService.delete(this.promotion.id).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);
				if(response.success) {
					this.dialogService.notify("Promotion successfully deleted", "success");
					this.router.navigateByUrl("/app/promotions");
				}
			})
		})
	}

}
