import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		MatSidenavModule,
		MatCardModule,
		MatSelectModule,
		MatMenuModule,
		MatCheckboxModule,
		MatTableModule,
		MatPaginatorModule,
		MatProgressSpinnerModule
	],
	exports: [
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatBadgeModule,
		MatSidenavModule,
		MatCardModule,
		MatSelectModule,
		MatMenuModule,
		MatCheckboxModule,
		MatTableModule,
		MatPaginatorModule,
		MatProgressSpinnerModule
	]
})
export class MaterialModule {}
