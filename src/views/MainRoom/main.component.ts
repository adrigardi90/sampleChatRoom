import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import * as SERVICEs from './../../services';
import * as ANI from './../../animations/animation';

@Component({
  templateUrl : './main.component.html',
  providers : [SERVICEs.SocketConnectionService],
  animations: [ANI.secondAnimation('1s', 0, 1),
               ANI.firstAnimation(800, 'translateY(-100%)', 'translateY(100%)')]
})
export class MainComponent implements OnInit{

  private userLogged;
  private message : string = '';
  private chatMessages : string = '';
  private upIndex:number = 0;
  private downIndex:number;
  private listUsers : any ;
  private listUsersCopy: any ;
  private chatLines: Array<any> = new Array();

	
  constructor(private channel: SERVICEs.SocketConnectionService,
              private http: SERVICEs.HttpService,
              private router: Router){

      this.userLogged = JSON.parse(sessionStorage.getItem('logged'));
      this.downIndex = Math.floor((window.innerHeight - 200) / 65);
      this.channel.connect();

      //Listening to new messages
      this.channel.getMessage('message').subscribe( (data) => {
        this.cleanChat();
        let userView;
        let line;
        let obj = this.parseObj(data);
        obj[0].email == this.userLogged.email ? userView = 'yo' : userView = obj[0].nickName;
        userView != 'yo' ? line = userView.toUpperCase() +': ' + obj[1].message : line = obj[1].message;
        this.chatLines.push({message: line, user: userView});
    });

      //Listening to new users
      this.channel.getMessage('new-user').subscribe( (users) => {
        this.listUsers = users;
        this.listUsersCopy = this.listUsers.slice(0,this.downIndex);
      });
  }

  ngOnInit(){
    //New user message when the state is loaded
   this.channel.sendMessage('new-user', JSON.stringify(this.userLogged));
  }

  sendMessage(){
    if(this.message != ''){
      let messageObj = [this.userLogged, {message: this.message}];
      this.channel.sendMessage('new-message', JSON.stringify(messageObj));
      this.message = '';
    } 
  }

  logOut(){
      this.http.request(this.userLogged, '/logout').subscribe( 
        (res) => {
          this.channel.sendMessage('disconnect', JSON.stringify(this.userLogged));
          this.channel.disconnect();
          sessionStorage.removeItem('logged');
        this.router.navigate(['login']);
        }, (err) => {
          alert("Error ");
        }
      );
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

  cleanChat(){
    if(this.chatLines.length > 50){
      this.chatLines = []
    }
  }
}
