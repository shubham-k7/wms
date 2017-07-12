import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// -----Providers-----
import { ChartDataService } from './chart-data.service';
import { ChartFilterService } from './chart-filter.service';
// -----Highcharts Imports-----
declare var require: any;
import { ChartComponent } from 'angular2-highcharts';
var Highcharts = require('highcharts/highcharts');
var HighchartsMore = require('highcharts/highcharts-more');
var HighchartsDrilldown = require('highcharts/modules/drilldown');
var HighchartsExporting = require('highcharts/modules/exporting.src');
var HighchartsExportData = require('highcharts/modules/export-data.src');
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

@Component({
	selector: 'app-chart',
	templateUrl: './charts.component.html',
	styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
 
	constructor(public chartDataService: ChartDataService, 
				private chartFilterService: ChartFilterService){ }
	@Input() filter: any;
	options = {
		chart: {
			name: "biker" ,
			type: 'column',
			renderTo: "bikerchart" ,
			zoomType: 'x',
			panning: true,
			panKey: 'shift',
			resetZoomButton: {
				position: {
					align: 'center',
					verticalAlign: 'top',
					x: -20,
					y: 10
				},
				relativeTo: 'chart',
				theme: {
					fill: 'white',
					stroke: 'silver',
					r: 0,
					states: {
						hover: {
							fill: '#41739D',
							style: {
								color: 'white'
							}
						}
					}
				}
			},
			events: {
				drilldown: function(e) {
					if (!e.seriesOptions) {
						var chart = this;
						chart.showLoading('Fetching Data ...');
						console.log(e);
						var chartid = this.pointer.options.chart.name;
						this.getChartData(e, chartid);
					}
				},
				drillupall: function(e) {
					this.hideData();
					let temp = this.options.chart.name.split('-'),
						kpi_name = temp[0],
						chartid = temp[1];
					this.kpilist[kpi_name][this.options.chart.name]._drilldowns.pop();
				}
			}
		},
		title: {
			text: null
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: '%values%'
			}
		},
		legend: {
			enabled: true
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '%format%'
				},
				cursor: 'pointer',
				point: {
					events: {
						click: function() {
							this.getSirwalaChart(this.category);
						}
					}
				}
			},
			column: {
				events: {
					legendItemClick: function() {
						return true;
					}
				}
			}
		},
		series: [],
		drilldown: {
			allowPointDrilldown: false,
			series: []
		},
		responsive: {
			rules: [{
				condition: {
					maxWidth: 1000
				},
				chartOptions: {
					legend: {
						align: 'center',
						verticalAlign: 'bottom',
						layout: 'horizontal'
					},
					yAxis: {
						labels: {
							align: 'left',
							x: 0,
							y: -5
						},
						title: {
							text: null
						}
					},
					subtitle: {
						text: null
					},
					credits: {
						enabled: false
					}
				}
			}]
		}
	};
	chartInit(chartid: string,conf: any): string{
		// Do NOT REMOVE this. 
		var comp = this;        
		// It's used inside chart confs to access ChartComponent instance
		var data = eval('(' + conf + ')');
		let prevConfig = this.chartlist[chartid];
		if(prevConfig) {
			this.chartlist[chartid] = {...prevConfig,_chart: null};
		}
		else{
			this.chartlist[chartid] = {	
													_chart:  null,
													_drilldowns: ['All'],
													_selectedvalue: null,
													_maxDate: null,
													_mon: null,
													_sDate: null,
													_eDate: null,
													_divisions: null,
													_filteredDivisions: null,
													_filter: null
												};									
		}
		// console.log(this.kpilist);
		var chart = new Highcharts.Chart(data);
		this.chartlist[chartid]._chart = chart;
		chart.options.drilldown.activeDataLabelStyle = { "cursor": "pointer", "color": "#003399",
		 "fontWeight": "bold", "textDecoration": "!none","text-transform": "uppercase" };
		chart.options.drilldown.activeAxisLabelStyle = { "cursor": "pointer", "color": "#003399",
		 "fontWeight": "bold", "textDecoration": "!none","text-transform": "uppercase" };
		chart.options.drilldown.drillUpButton = {
				relativeTo: 'chart',
				position: {
					align: "right",
					y: 6,
					x: -50
				},
				theme: {
					fill: 'white',
					'stroke-width': 1,
					stroke: 'silver',
					opacity: 0.5,
					r: 0,
					states: {
						hover: {
							fill: '#41739D',
							style: {
								color: "white"
							},
							opacity: 1
						},
						select: {
							stroke: '#039',
							fill: '#bada55'
						}
					}
				}
			};
		return data.chart.name;
	}
	getCharts() {
		this.chartDataService.getCharts(this.filter).subscribe((data) => {

		});
	}
	update(filter: any) {
		this.chartDataService.getCharts(filter).subscribe((data) => {

		});
	}
	drilldownsAdded: any;
	chartlist: Map<string,any> = new Map<string,any>();
	ngOnInit() {
		this.drilldownsAdded = 0;
		// this.getCharts();
	}
}
