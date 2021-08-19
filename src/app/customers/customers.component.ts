import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../models/products";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../models/customers";
import {UsersService} from "../services/users.service";
import {SessionService} from "../services/session.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss'],
	providers: [UsersService]
})
export class CustomersComponent implements OnInit {

	// @ts-ignore
	tableDataSource: MatTableDataSource<Customer>

	loadingDataFromApi: boolean = true;

	displayedColumns: string[] = ['name', 'email', 'totalSpend', 'joindate', 'isRegistered', 'actions'];

	// @ts-ignore
	@ViewChild(MatPaginator) paginator: MatPaginator

	constructor(
		private userService: UsersService,
		private sessionService: SessionService,
		private router: Router
	) {	}

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this.loadingDataFromApi = true;
		this.userService.getUsers().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);

			if(response.success) {
				this.tableDataSource = new MatTableDataSource<Customer>(response.data);
				this.tableDataSource.paginator = this.paginator;

				this.loadingDataFromApi = false;
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

}
