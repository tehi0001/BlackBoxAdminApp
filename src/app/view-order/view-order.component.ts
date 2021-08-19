import { Component, OnInit, ViewChild } from '@angular/core';
import {OrderService} from "../services/order.service";
import {DialogService} from "../services/dialog.service";
import {SessionService} from "../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";

@Component({
	selector: 'app-view-order',
	templateUrl: './view-order.component.html',
	styleUrls: ['./view-order.component.scss'],
	providers: [OrderService]
})
export class ViewOrderComponent implements OnInit {

	order: any;

	loadingDataFromAPi: boolean = true;

	changingOrderStatus: boolean = false;

	deletingOrder: boolean = false;

	// @ts-ignore
	@ViewChild(MatSelect) orderStatus: MatSelect

	constructor(
		private orderService: OrderService,
		private dialogService: DialogService,
		private sessionService: SessionService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.getOrder();
	}

	getOrder(): void {
		this.route.params.subscribe(param => {
			this.orderService.getOrder(param.id).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);

				if(response.success) {
					this.order = response.data;

					this.loadingDataFromAPi = false;
				}
			})
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

	changeOrderStatus(): void {
		this.dialogService.confirm("Are you sure you want to change this order's status?").subscribe(() => {
			this.changingOrderStatus = true;
			this.orderService.changeOrderStatus(this.order?.id, this.orderStatus.value).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);
				if(response.success) {
					this.dialogService.notify("Order status successfully updated", "success");
					this.order.status = parseInt(this.orderStatus.value);
					this.changingOrderStatus = false;
				}
			}, error => {
				this.sessionService.handleHttpErrors(error);
			})
		}, () => {
			this.orderStatus.value = this.order?.status.toString();
		})
	}

	deleteOrder(): void {
		this.dialogService.confirm("Are you sure you want to delete this order?", "Note that this action cannot be reversed").subscribe(() => {
			this.deletingOrder = true;
			this.orderService.deleteOrder(this.order?.id).subscribe(response => {
				response = this.sessionService.renewSessionToken(response);

				if(response.success) {
					this.dialogService.notify("Order No." + this.order?.order_number + " successfully deleted", "success");
					this.router.navigateByUrl("/app/orders");
					this.deletingOrder = false;
				}
			}, error => {
				this.sessionService.handleHttpErrors(error);
			})
		})
	}
}
