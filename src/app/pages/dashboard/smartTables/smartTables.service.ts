import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class SmartTablesService {

	constructor(protected http: Http) {}
  	private extractData(res: Response) {
		let body = res.json();
		// console.log(body);
		return body || { };
	}
	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
  	getTableData(payload: any): Observable<any> {
		var url = 'http://52.70.207.115:8087/pizzahut/v1/order_details/';
    	let headers = new Headers({'content-type': 'application/json'});
    	var token = JSON.parse(sessionStorage.getItem('currentUser'))['token'];
        console.log(token);
        token = "Token "+token;
        headers.append('Authorization', token);
        let options = new RequestOptions({ headers: headers});
        payload = JSON.stringify(payload);
		return Observable.interval(60000).startWith(0).switchMap(() => {
			return this.http.post(url,payload,options).map(this.extractData).catch(this.handleError);
		});
  	}
	
}
