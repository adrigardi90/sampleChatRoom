import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as SERVICEs from './../../services';
import * as ANI from './../../animations/login';


@Component({
  templateUrl: './uploadImage.component.html',
  animations: [ANI.firstAnimation(500, 'translateX(-100%)', 'translateX(100%)')]
})
export class UploadImageComponent {

	private imgSrc: string;
	@ViewChild('inputfile') input: any;
	@ViewChild('inputImage') inputImage: any;
	private file: any;
	private fileName: string = '';
	private base64textString:string='';
	private imgUpload: string = '';
	private userLogged: any;

	constructor(private http: SERVICEs.HttpService,
				private router: Router){
		this.imgSrc = "./../../assets/undefined.png";
		this.file = new Object();
		this.userLogged = JSON.parse(sessionStorage.getItem('logged'));
		console.log(this.userLogged)
	}

	uploadImg(){
		let image: any = this.input.nativeElement;
    	image.click();
	}

	onFileChange(event) {
	    this.file = event.target.files[0];
	    this.fileName = this.file.name;

	   // let valid = this.validFormat();

	    //if(valid) {
	      

	      let fr = new FileReader();

	      fr.onload = this._load.bind(this);

	      //fr.readAsDataURL(this.file);
	      fr.readAsBinaryString(this.file);
	    //} else {
	    //  this.snackBar.openSnackBar('Formato de imagen no válido','OK', 3000);
	    //}
	  }

	  _load(event){
	  		//image.src = fr.result;
	  		let image: any = this.inputImage.nativeElement;
	        var binaryString = event.target.result;
            this.base64textString= 'data:image/png;base64,' + btoa(binaryString)
            console.log(btoa(binaryString));
            //image.src = this.base64textString;
	  }

	  enter(){

	  		this.userLogged.imgProfile = this.base64textString;

	  		this.http.request(this.userLogged, '/uploadProfile').subscribe( (res) => {
	  			
		  		sessionStorage.setItem('logged', JSON.stringify(this.userLogged));
		  		this.router.navigate(['/mainRoom']);
	  		}, (err) => {
	  			//sessionStorage.removeItem('logged');
	  			this.router.navigate(['/login']);
	  		});
	  		
	  }
}
