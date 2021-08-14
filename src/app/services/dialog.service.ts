import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

	constructor(
		private snackBar: MatSnackBar,
		private dialog: MatDialog
	) { }

	notify(message: string, type: "error" | "success" = "error", actionText: string = "OK") {
		this.snackBar.open(message, actionText, {
			duration: 5000,
			panelClass: (type == "success") ? "success-message" : "error-message"
		});
	}

	confirm(mainMessage: string, subMessage: string = ""): Observable<any> {
		return new Observable<any>(observer => {
			const dialogRef = this.dialog.open(ConfirmDialogComponent, {
				width: '500px',
				data: {
					mainMessage: mainMessage,
					subMessage: subMessage
				}
			});

			dialogRef.afterClosed().subscribe(response => {
				if(response) {
					observer.next();
				}
			})
		})
	}
}
