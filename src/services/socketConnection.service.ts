import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';

@Injectable()
export class SocketConnectionService {

	private url = 'http://localhost:3000';
	private socket;

	connect(){
		this.socket = io(this.url);
	}

	sendMessage(type: string, message:string){
		this.socket.emit(type, message);
	}

	getMessage(type: string){
		
		let data = new Observable( (observer) => {

			this.socket.on(type, (message) =>{
				observer.next(message);
			})
		});

		return data;
	}

	disconnect(){
		this.socket.disconnect();
	}
}