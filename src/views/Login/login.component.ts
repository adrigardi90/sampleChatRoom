import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as SERVICEs from './../../services';


@Component({
  templateUrl: './login.component.html'
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
		this.http.login(this.user).subscribe( (res) => {
			console.log(res)
			this.loading = false;
			sessionStorage.setItem('logged', JSON.stringify(this.user));
			this.router.navigate(['/upload']);
		}, (err) => {
			alert("usuario ya logado");
			this.loading = false;
		});

		
	}
}
