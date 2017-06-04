import { Component, Input , ViewChild} from '@angular/core';

@Component({
  selector: 'main-card',
  templateUrl: './mainCard.component.html'
})
export class MainCardComponent  {

	@Input() title: string;
	@Input() subtitle: string;
	@Input() avatarClass: string;
	@Input() loading: boolean;
	@Input() imgSrc: string;

	constructor(){}

}
