import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { SocketConnectionService } from './../../services/socketConnection.service';
import * as ANI from './../../animations/login';

@Component({
  templateUrl : './main.component.html',
  providers : [SocketConnectionService],
  animations: [ANI.secondAnimation('1s', 0, 1),
               ANI.firstAnimation(800, 'translateY(-100%)', 'translateY(100%)')]
})
export class MainComponent implements OnInit{

  private userLogged;
  private message : string = '';
  private chatMessages : string = '';
  private listUsers : any = [{nickName:'1', email: 'adriddddddddddddddddddd@hotmail.com', imgProfile:''},
  {nickName:'2', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'3', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'4', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'5', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'6', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'7', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'pepito', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'pepito', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'pepito', email: 'adri@hotmail.com', imgProfile:''}];

  private listUsersCopy: any = [{nickName:'1', email: 'adriddddddddddddddddddd@hotmail.com', imgProfile:''},
  {nickName:'2', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'3', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'4', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'5', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'6', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'7', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'pepito', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'pepito', email: 'adri@hotmail.com', imgProfile:''},
  {nickName:'pepito', email: 'adri@hotmail.com', imgProfile:''}];

  private upIndex:number = 0;
  private downIndex:number = 5;


	
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
      this.listUsersCopy = this.listUsers.splice(0,9);
    });

    //console.log(Math.floor((window.innerHeight - 132) / 65));
    this.listUsersCopy = this.listUsers.slice(0,5);
  }

  ngOnInit(){
   this.channel.sendMessage('new-user', JSON.stringify(this.userLogged));
  }

  sendMessage(){
    let messageObj = [this.userLogged, {message: this.message}];
    this.channel.sendMessage('new-message', JSON.stringify(messageObj));
    this.message = '';
  }

  logOut(){
    console.log("out")
    //this.channel.disconnect();
  }

  parseObj(data:any){
    return JSON.parse(String(data));
  }

  upUser(){
    this.upIndex--;
    this.downIndex--; 
    this.listUsersCopy= this.listUsers.slice(this.upIndex, this.downIndex )
  }

  downUser(){
    this.upIndex++;
    this.downIndex++; 
    this.listUsersCopy= this.listUsers.slice(this.upIndex, this.downIndex )
  }

  upDisabled(): boolean {
    return !(this.listUsers.length > 5 && this.upIndex > 0);
  }

  downDisabled(): boolean {
    return this.listUsers.length > 5 && this.downIndex == this.listUsers.length;
  }
}
