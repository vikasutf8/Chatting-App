import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './component/todo/todo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TodoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //change page dyanmice without reload
  title = 'angular-todo-list';
  // constructor(){
  //   setTimeout(()=>{
  //     this.title ="working on todo"
  //   },2000)
  // }
}
