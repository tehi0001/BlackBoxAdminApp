export interface Product {
	id: number;
	image: string;
	name: string;
	price: number;
	stock: number;
}

export interface ProductProperty {
	type: string;
	name: string;
	value: string;
}
