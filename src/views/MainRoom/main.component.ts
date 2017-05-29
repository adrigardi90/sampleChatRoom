import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { SocketConnectionService } from './../../services/socketConnection.service';

@Component({
  templateUrl: './main.component.html',
  providers : [SocketConnectionService]
})
export class MainComponent implements OnInit{

  private userLogged;
  private message : string = '';
  private chatMessages : string = '';
	
  constructor(private channel: SocketConnectionService){
    this.userLogged = JSON.parse(sessionStorage.getItem('logged'));
    this.channel.connect();
    this.channel.getMessage('message').subscribe( (data) => {
      let userView;
      let obj = JSON.parse(String(data)) ;
      obj[0].email == this.userLogged.email ? userView = 'yo' : userView = obj[0].nickName;
      this.chatMessages += userView +':' + obj[1].message + '\n';

    });
    
  }

  ngOnInit(){
    this.channel.sendMessage('new-user', this.userLogged.email);
  }

  sendMessage(){
    let messageObj = [this.userLogged, {message: this.message}];
    this.channel.sendMessage('new-message', JSON.stringify(messageObj));
    this.message = '';
  }

  goOut(){
    this.channel.disconnect();
  }

}
