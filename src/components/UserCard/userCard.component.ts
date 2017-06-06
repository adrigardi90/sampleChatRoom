import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-card',
  template: `<md-card class="user-card">
			  <md-card-header style="overflow: hidden">
			    <div md-card-avatar> <img [src]="imgSrc"></div>
			    <md-card-title *ngIf="nickName">{{nickName}}</md-card-title>
			    <md-card-subtitle *ngIf="email">{{email}}</md-card-subtitle>
			  </md-card-header>
			</md-card>`
})
export class UserCardComponent{

	@Input() nickName: string;
	@Input() email: string;
	@Input() imgSrc: string;

	constructor(){}
}
