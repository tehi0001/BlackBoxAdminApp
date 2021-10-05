import {Component, OnInit} from '@angular/core';

import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle
} from 'chart.js';
import {DashboardService} from "../services/dashboard.service";
import {SessionService} from "../services/session.service";

Chart.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	data: any;

	loadingData: boolean = true;

	constructor(
		private dashboardService: DashboardService,
		private sessionService: SessionService
	) { }

	ngOnInit(): void {
		this.dashboardService.getData().subscribe(response => {
			response = this.sessionService.renewSessionToken(response);
			if(response.success) {
				this.data = response.data;

				this.loadingData = false;

				setTimeout(() => {
					this.salesChart();
					this.customerChart();
				}, 200);
			}
		}, error => {
			this.sessionService.handleHttpErrors(error);
		})
	}

	randomColor(count: number) {
		let colorArray = []
		for(let i = 0; i < count; i++) {
			colorArray.push("#" + Math.floor(Math.random()*16777215).toString(16));
		}
		return colorArray;
	}

	getSalesLabels() {
		let labels: any[] = [];
		let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		// @ts-ignore
		this.data.sales.forEach(sale => {
			labels.push(months[parseInt(sale.month) - 1]);
		});

		return labels;
	}

	getSalesData() {
		let data: number[] = [];

		// @ts-ignore
		this.data.sales.forEach(sale => {
			data.push(sale.total);
		});

		return data;
	}

	getProvinceLabels() {
		let labels: string[] = [];
		// @ts-ignore
		this.data.province.forEach(province => {
			labels.push(province.province)
		});

		return labels;
	}

	getProvinceData() {
		let data: number[] = [];
		// @ts-ignore
		this.data.province.forEach(province => {
			data.push(province.users);
		});

		return data;
	}

	salesChart() {
		// @ts-ignore
		let ctx = document.getElementById('salesChart').getContext('2d');
		// @ts-ignore
		let myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: this.getSalesLabels(),
				datasets: [{
					label: 'Total Sales',
					data: this.getSalesData(),
					backgroundColor: this.randomColor(12),
					borderWidth: 1,
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: false
						}
					},
					x: {
						beginAtZero: true,
						grid: {
							display: false
						}
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}
		});
	}

	customerChart() {
		// @ts-ignore
		let ctx = document.getElementById('customersChart').getContext('2d');
		// @ts-ignore
		let myChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: this.getProvinceLabels(),
				datasets: [{
					label: 'Total Sales',
					data: this.getProvinceData(),
					backgroundColor: this.randomColor(9),
					borderWidth: 1,
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: false,
							drawBorder: false
						},
						ticks: {
							display: false
						}
					},
					x: {
						beginAtZero: true,
						grid: {
							display: false,
							drawBorder: false
						},
						ticks: {
							display: false
						}
					}
				},
				plugins: {
					legend: {
						display: true
					}
				}
			}
		});
	}


}
