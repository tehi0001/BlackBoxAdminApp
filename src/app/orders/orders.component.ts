import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../models/products";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../models/orders";
import {OrderService} from "../services/order.service";
import {SessionService} from "../services/session.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
	providers: [OrderService]
})
export class OrdersComponent implements OnInit {

	// @ts-ignore
	tableDataSource: MatTableDataSource<Order>

	displayedColumns: string[] = ['id', 'billingName', 'date', 'total', 'status', 'actions'];

	loadingDataFromApi: boolean = true;

	// @ts-ignore
	@ViewChild(MatPaginator) paginator: MatPaginator

	constructor(
		private orderService: OrderService,
		private sessionService: SessionService
	) {}


  ngOnInit(): void {
		this.getOrders();
  }

  getOrders(): void {
		this.orderService.getOrders().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);
			if(response.success) {
				this.tableDataSource = new MatTableDataSource<Order>(response.data);
				this.tableDataSource.paginator = this.paginator;
			}
			this.loadingDataFromApi = false;
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
  }

	applyFilter(event: Event)  {
		const filterValue = (event.target as HTMLInputElement).value;
		this.tableDataSource.filter = filterValue.trim().toLowerCase();
	}

}
