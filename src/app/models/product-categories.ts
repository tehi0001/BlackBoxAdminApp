export interface ProductCategory {
	id: number;
	category_name: string;
	description: string;
	entry_date: string;
}

export interface ProductCategoryRequest {
	name: string;
	description: string;
}
