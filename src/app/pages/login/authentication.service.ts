import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;
    private isLoggedIn=false;
    constructor(public router: Router,private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    isLogged(): any {
        return this.isLoggedIn;
    }

    login(username: string, password: string): Observable<boolean> {

        let headers = new Headers({'content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
        return this.http.post('http://zastapi.prtouch.com/api/authentication/token/',
         JSON.stringify({ username: username, password: password }),options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
            //    this.isLoggedIn=true;
                if(response.json()['success']===true)
                {
                    let token = response.json()['data']['auth_key'];
                    this.token = token;
                    sessionStorage.setItem('currentUser', 
                        JSON.stringify({ data: response.json()['data'], token: token }));
                    // return true to indicate successful login
                    return true;
                }
                else {
                    // return false to indicate failed login
                    return false;
                }
            });

    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        sessionStorage.removeItem('currentUser');
        this.isLoggedIn=false;
        this.router.navigate(['']);
    }
}