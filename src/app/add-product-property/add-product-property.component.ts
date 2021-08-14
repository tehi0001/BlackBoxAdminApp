import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductProperty} from "../models/products";

@Component({
  selector: 'app-add-product-property',
  templateUrl: './add-product-property.component.html',
  styleUrls: ['./add-product-property.component.scss']
})
export class AddProductPropertyComponent implements OnInit {

	addPropertyForm: FormGroup;

	@Output() done: EventEmitter<ProductProperty> = new EventEmitter<ProductProperty>();

	constructor() {
		this.addPropertyForm = new FormGroup({
			type: new FormControl('dimension', [Validators.required]),
			name: new FormControl('', [Validators.required]),
			value: new FormControl('', [Validators.required])
		});
	}

	ngOnInit(): void {
	}

	save(): void {
		this.done.emit(this.addPropertyForm.value);
	}
}
