import { Component, OnInit } from '@angular/core';
import { Todo } from '../../todos';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [TodoItemComponent, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})



export class TodoComponent implements OnInit {
  todos:Todo[]; //array of Todo as  reference class 

  constructor(){
    this.todos =[
     {
      sno:3,
      title:"testing 1",
      desc :"afjasgkj",
      active:true
     },
     {
      sno:4,
     title:"testing 4",
     desc :"afjasgkj",
     active:false
     }
    ]
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  deletetodo(todo :Todo){
    console.log(todo)
    let index = this.todos.indexOf(todo)
    this.todos.splice(index,1)
  }
}
