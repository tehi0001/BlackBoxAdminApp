import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

	transform(value: number, ...args: unknown[]): unknown {
		switch (value) {
			case 0:
				return "Pending Payment";
			case 1:
				return "Payment Failed";
			case 2:
				return "Paid";
			case 3:
				return "Processing";
			case 4:
				return "Shipped";
			case 5:
				return "Delivered";
			default:
				return "Rejected";
		}
	}

}
