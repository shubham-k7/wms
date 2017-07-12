import {Component} from '@angular/core';

// import { SmartTablesService } from './smartTables.service';
// -----MaterialDesign Imports-----
import { DateAdapter } from '@angular/material';
import { DateLocale } from 'md2';
import { Month } from '../../../assets/month';

import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  	constructor(private myDate: DateLocale) {
  		this.myDate.months = Month;
  	}
  	options = [
		{id: 1, value: 'Month'},
		{id: 2, value: 'Range'}
	];
	filterDivisions(event,kpi_name: string,version: string) {
		var chartid = kpi_name+'-'+version,
			query = event.query,
			filtered : any[] = [];
		console.log(query);
		/*this.chartFilterService.getFilteredResults(query).subscribe(filtered => {
			this.kpilist[kpi_name][chartid]._filteredDivisions = filtered;
		},
		(err) => {
			alert(err);
		});*/
		for(let i = 0; i < this.division.length; i++) {
            let country = this.division[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filter._filteredDivisions = filtered;
	}
	division = [{name: "India", type: "Country"},
				 {name: "East", type: "Zone"},	
				 {name: "Assam", type: "State"},
				 {name: "Ex.guwahati", type: "City"},
				 {name: "GUW", type: "DC"}]
	selection(event) {
		console.log(event);
		if(!event){
			this.filter._mon = null;
			this.filter._sDate = null;
			this.filter._eDate = null;
			this.filter._maxDate = null;
		}
		switch((event && event.id))
		{
			case 1:
				this.filter._sDate = null;
				this.filter._eDate = null;
				this.filter._maxDate = null;
				break;
			case 2:
				this.filter._mon = null;
				break;
		}
	}
	setGlobalMaxDate() {
		this.MAX_DATE = new Date();
	}
	setMaxDate() {
		var temp_date = this.filter._sDate;
		var temp2 = new Date();
		var temp = new Date(temp_date);
		temp.setDate(temp.getDate() + 31);
		this.filter._maxDate = (temp>temp2)?temp2:temp;
	}
	update(event) {
		console.log(event);
	}
	check(event) {
		console.log(event);
	}
	MAX_DATE = new Date();
	filter = {
		_selectedvalue: null,
		_maxDate: null,
		_mon: null,
		_sDate: null,
		_eDate: null,
		_divisions: null,
		_filteredDivisions: null,
		_filter: null,
	}
}
