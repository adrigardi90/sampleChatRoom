import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as SERVICEs from './../../services';
import * as ANI from './../../animations/animation';

@Component({
  templateUrl: './uploadImage.component.html',
  animations: [ANI.firstAnimation(500, 'translateX(-100%)', 'translateX(100%)')]
})
export class UploadImageComponent {

	@ViewChild('inputfile') input: any;
	@ViewChild('inputImage') inputImage: any;
	private imgSrc: string;
	private file: any;
	private fileName: string = '';
	private base64textString:string='';
	private imgUpload: string = '';
	private userLogged: any;

	constructor(private http: SERVICEs.HttpService,
				private router: Router){
		//Default image
		this.imgSrc = "./../../assets/undefined.png";
		this.file = new Object();
		this.userLogged = JSON.parse(sessionStorage.getItem('logged'));
	}

	uploadImg(){
		let image: any = this.input.nativeElement;
    	image.click();
	}

	onFileChange(event) {
		//Obtain the upload file
		this.file = event.target.files[0];
		this.fileName = this.file.name;
		
		let fr = new FileReader();
		fr.onload = this._load.bind(this);
		fr.readAsBinaryString(this.file);

	  }

	_load(event){
  		let image: any = this.inputImage.nativeElement;
        var binaryString = event.target.result;
        //image to base64
        this.base64textString= 'data:image/png;base64,' + btoa(binaryString)
	}

	enter(){

		this.userLogged.imgProfile = this.base64textString;

		this.http.request(this.userLogged, '/uploadProfile').subscribe( 
			(res) => {
		  		sessionStorage.setItem('logged', JSON.stringify(this.userLogged));
		  		this.router.navigate(['/mainRoom']);
			}, (err) => {
				alert("Debes logarte para poder acceder a la sala de chat");
				this.router.navigate(['/login']);
			}
		);
	
	}
}
