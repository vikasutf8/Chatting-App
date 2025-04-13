import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'web';
  isJoined =false;
  name :string ='';
  message:any ="";
  messages:any[]=[]  ///ary to show
  socket = Inject(Socket)  //socket services

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.socket.on("chat-received",(data:any)=>{
      console.log("chat-reveived",data);
      this.messages.push(data)
    })
  }
  

  join(){
console.log("Joins",this.name)
    this.isJoined =true
    //TODO1 : i have to send an event so I am joined :envetname, data
    this.socket.emit("joined",this.name)
  }
  send(){
    console.log("send",this.message)
    this.socket.emit('chat',{name:this.name,chat:this.message})
    this.message ="";
  }
}
