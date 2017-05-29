import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'user-card',
  template: `<md-card style="padding: 15px !important;width: 20% !important; height: 40px">
			  <md-card-header style="margin-top: 0px !important; */">
			    <div md-card-avatar> <img [src]="imgSrc" style="height: 50px !important;width: 60px !important;"></div>
			    <md-card-title *ngIf="nickName">{{nickName}}</md-card-title>
			    <md-card-subtitle *ngIf="email">{{email}}</md-card-subtitle>
			  </md-card-header>
			</md-card>`
})
export class UserCardComponent implements OnInit {

	@Input() nickName: string;
	@Input() email: string;
	@Input() imgSrc: string;

	constructor(){}

	ngOnInit(){}
}
