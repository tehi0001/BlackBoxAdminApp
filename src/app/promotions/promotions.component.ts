import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Promotion} from "../models/promotions";
import {PromotionsService} from "../services/promotions.service";
import {SessionService} from "../services/session.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

	// @ts-ignore
	tableDataSource: MatTableDataSource<Promotion>

	displayedColumns: string[] = ['name', 'description', 'dateCreated', 'startDate', 'endDate', 'actions'];

	loadingDataFromApi: boolean = true;

	// @ts-ignore
	@ViewChild(MatPaginator) paginator: MatPaginator

	constructor(
		private promotionService: PromotionsService,
		private sessionService: SessionService
	) {	}

	ngOnInit(): void {
		this.promotionService.getAll().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.tableDataSource = new MatTableDataSource<Promotion>(response.data);
				this.tableDataSource.paginator = this.paginator;
				this.loadingDataFromApi = false;
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

}
