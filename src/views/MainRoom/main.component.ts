import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { SocketConnectionService } from './../../services/socketConnection.service';

@Component({
  templateUrl : './main.component.html',
  providers : [SocketConnectionService]
})
export class MainComponent implements OnInit{

  private userLogged;
  private message : string = '';
  private chatMessages : string = '';
  private listUsers : any;
	
  constructor(private channel: SocketConnectionService){
    this.userLogged = JSON.parse(sessionStorage.getItem('logged'));
    this.channel.connect();
    this.channel.getMessage('message').subscribe( (data) => {
      let userView;
      let obj = this.parseObj(data);
      obj[0].email == this.userLogged.email ? userView = 'yo' : userView = obj[0].nickName;
      this.chatMessages += userView +':' + obj[1].message + '\n';

    });

    this.channel.getMessage('new-user').subscribe( (users) => {
      console.log(users)
      this.listUsers = users;
    });
    
  }

  ngOnInit(){
   this.channel.sendMessage('new-user', JSON.stringify(this.userLogged));
  }

  sendMessage(){
    let messageObj = [this.userLogged, {message: this.message}];
    this.channel.sendMessage('new-message', JSON.stringify(messageObj));
    this.message = '';
  }

  goOut(){
    this.channel.disconnect();
  }

  parseObj(data:any){
    return JSON.parse(String(data));
  }

}
