import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-card',
  templateUrl: './mainCard.component.html'
})
export class MainCardComponent implements OnInit {

	@Input() title: string;
	@Input() subtitle: string;
	@Input() avatarClass: string;
	@Input() loading: boolean;


	constructor(){
	}

	ngOnInit(){
		console.log("clasee", this.avatarClass)
	}
}
