import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as SERVICEs from './../../services';
import * as ANI from './../../animations/animation';

@Component({
  templateUrl: './login.component.html',
  animations: [ANI.firstAnimation(500, 'translateX(-100%)', 'translateX(100%)')]
})
export class LoginComponent {

	private user : any;
	private loading: boolean = false;

	constructor(private router: Router,
				private http: SERVICEs.HttpService){
		this.user = {imgProfile:'', nickName: '', email: ''};
	}

	login(){
		this.loading = true;
		this.http.request(this.user, '/login').subscribe( (res) => {
			this.loading = false;
			sessionStorage.setItem('logged', JSON.stringify(this.user));
			this.router.navigate(['upload']);
		}, (err) => {
			alert("El usuario con email " + this.user.email + " ya está logado");
			this.loading = false;
		});	
	}
}
