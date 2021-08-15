export interface Product {
	id: number;
	category: string;
	name: string;
	price: number;
	stock: number;
	image: string;
}

export interface ProductProperty {
	property_type: string;
	property_name: string;
	value: string;
}
