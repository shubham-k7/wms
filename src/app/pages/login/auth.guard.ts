import { Injectable } from '@angular/core';
import { CanActivate,CanDeactivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanDeactivate<boolean>{

    constructor(private router: Router) { }

    canActivate() {
        // return true;
        // user: 
        if (sessionStorage.getItem('currentUser')) {
            return true;
        }
        this.router.navigate(['pages/dashboard']);
        return false;
    }

    canDeactivate() {
        if (sessionStorage.getItem('currentUser')) {
            this.router.navigate['/dashboard'];
            return true;
        }
        return false;
    }
}
