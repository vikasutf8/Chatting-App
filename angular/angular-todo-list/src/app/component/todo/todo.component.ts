import { Component, OnInit } from '@angular/core';
import { Todo } from '../../todos';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CommonModule } from '@angular/common';
import { AddtodoComponent } from "../addtodo/addtodo.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [TodoItemComponent, CommonModule, AddtodoComponent,FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})



export class TodoComponent implements OnInit {
  todos:Todo[]; //array of Todo as  reference class 
  localItem :string |null;
  constructor(){
    this.todos =[
    ],
    this.localItem =localStorage.getItem("todos")
    if(this.localItem ==null){
      this.todos=[]
    }
    else{
      console.log(this.localItem)
      this.todos =JSON.parse(this.localItem)
      
    }
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  deletetodo(todo :Todo){
    console.log(todo)
    let index = this.todos.indexOf(todo)
    this.todos.splice(index,1)
    localStorage.setItem("todos",JSON.stringify(this.todos))
  }

  Addtodo(todos :Todo){
    console.log(todos)
    this.todos.push(todos)
    localStorage.setItem("todos",JSON.stringify(this.todos))
  }
}
