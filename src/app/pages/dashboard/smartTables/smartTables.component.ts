import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  query: string = '';
  dataTable: any = {title: "Biker"};
  settings = {
    actions: false,
    columns: {
      order_number: {
        title: 'Order',
        type: 'number'
      },
      biker_name: {
        title: 'Biker',
        // width: '100px',
        type: 'string'
      },
      customer_name: {
        title: 'Customer',
        type: 'string'
      },
      created_time: {
        title: 'Date/Time',
        type: 'string'
      },
      status: {
        title: 'Status',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  today: Date;
  constructor(protected service: SmartTablesService) {
    this.today = new Date();
    var payload = {from_date: this.today.toString(),to_date: this.today};
    this.service.getTableData(payload).subscribe((data) => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
