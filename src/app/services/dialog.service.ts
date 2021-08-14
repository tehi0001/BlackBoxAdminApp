import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

	constructor(
		private snackBar: MatSnackBar
	) { }

	notify(message: string, type: "error" | "success" = "error", actionText: string = "OK") {
		this.snackBar.open(message, actionText, {
			duration: 5000,
			panelClass: (type == "success") ? "success-message" : "error-message"
		});
	}
}
