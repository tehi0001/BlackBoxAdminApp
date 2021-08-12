import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductsComponent} from "./products/products.component";
import {ProductCategoriesComponent} from "./product-categories/product-categories.component";
import {OrdersComponent} from "./orders/orders.component";
import {CustomersComponent} from "./customers/customers.component";
import {ShippingCostsComponent} from "./shipping-costs/shipping-costs.component";
import {PromotionsComponent} from "./promotions/promotions.component";
import {AdministratorsComponent} from "./administrators/administrators.component";
import {SettingsComponent} from "./settings/settings.component";
import {LogoutComponent} from "./logout/logout.component";
import {AddProductCategoryComponent} from "./add-product-category/add-product-category.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {ViewProductComponent} from "./view-product/view-product.component";
import {ViewOrderComponent} from "./view-order/view-order.component";
import {AddShippingCostComponent} from "./add-shipping-cost/add-shipping-cost.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "/login",
		pathMatch: "full"
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "app",
		component: MainComponent,
		children: [
			{
				path: "",
				redirectTo: "dashboard",
				pathMatch: "full"
			},
			{
				path: "dashboard",
				component: DashboardComponent
			},
			{
				path: "products",
				component: ProductsComponent
			},
			{
				path: "products/add",
				component: AddProductComponent
			},
			{
				path: "products/:id",
				component: ViewProductComponent
			},
			{
				path: "product-categories",
				component: ProductCategoriesComponent
			},
			{
				path: "product-categories/add",
				component: AddProductCategoryComponent
			},
			{
				path: "orders",
				component: OrdersComponent
			},
			{
				path: "orders/:id",
				component: ViewOrderComponent
			},
			{
				path: "customers",
				component: CustomersComponent
			},
			{
				path: "shipping-costs",
				component: ShippingCostsComponent
			},
			{
				path: "shipping-costs/add",
				component: AddShippingCostComponent
			},
			{
				path: "promotions",
				component: PromotionsComponent
			},
			{
				path: "administrators",
				component: AdministratorsComponent
			},
			{
				path: "settings",
				component: SettingsComponent
			},
			{
				path: "logout",
				component: LogoutComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
