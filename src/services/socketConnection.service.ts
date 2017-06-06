import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';

@Injectable()
export class SocketConnectionService {

	private url = 'http://localhost:3000';
	private socket;

	connect(){
		//Open socket connection
		this.socket = io(this.url);
	}

	sendMessage(type: string, message:string){
		//Emit a message to socket
		this.socket.emit(type, message);
	}

	getMessage(type: string){
		
		let data = new Observable( (observer) => {

			//We are listening to the emited messages
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