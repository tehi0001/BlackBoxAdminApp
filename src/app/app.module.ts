import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from "./modules/material/material.module";
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { ShippingCostsComponent } from './shipping-costs/shipping-costs.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoutComponent } from './logout/logout.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { AddShippingCostComponent } from './add-shipping-cost/add-shipping-cost.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
  MainComponent,
  DashboardComponent,
  ProductsComponent,
  ProductCategoriesComponent,
  OrdersComponent,
  CustomersComponent,
  ShippingCostsComponent,
  PromotionsComponent,
  AdministratorsComponent,
  SettingsComponent,
  LogoutComponent,
  AddProductCategoryComponent,
  AddProductComponent,
  ViewProductComponent,
  ViewOrderComponent,
  AddShippingCostComponent,
  ViewCustomerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
