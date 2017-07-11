import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Message } from 'primeng/primeng'; 
@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

	public error: Message[] = [];
	public form:FormGroup;
	public username:AbstractControl;
	public password:AbstractControl;
	public submitted:boolean = false;

  	constructor(fb:FormBuilder,private router: Router,private as: AuthenticationService) {
		this.form = fb.group({
		  'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
		  'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
		});
		this.username = this.form.controls['username'];
		this.password = this.form.controls['password'];
		sessionStorage.setItem('currentUser', 
			JSON.stringify({ data: "haaha", token: 1212121 }));
	}

  public onSubmit(values:Object):void {
	this.submitted = true;
	if (this.form.valid) {
		 this.as.login(this.username.value,this.password.value)
			.subscribe(result => {
					if(result===true){
						this.error=[];
						this.error.push({severity:'success', summary:'Success: ', detail:'Welcome to Analytics!'});
						this.router.navigate(['/pages/dashboard']);
					}
					else
					{ 
					  this.error=[];
						this.error.push({severity:'error', summary:'Error: ', detail:'Validation failed!'});
					}
				},
				 (err) => {
				   this.error=[];
						this.error.push({severity:'error', summary:'Error: ', detail:'Validation failed!'});
				 });
	  }
	}
}
