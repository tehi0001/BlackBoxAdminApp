export interface Product {
	id: number;
	category: string;
	name: string;
	price: number;
	stock: number;
	image: string;
}

export interface ProductProperty {
	type: string;
	name: string;
	value: string;
}
