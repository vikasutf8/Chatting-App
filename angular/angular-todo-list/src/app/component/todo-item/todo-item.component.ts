import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { Todo } from '../../todos';

@Component({
  selector: 'app-todo-item',
  imports:[],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo | any
  @Output() todoDelete :EventEmitter<Todo> =new EventEmitter();
  constructor(){
    // todo =this.todo
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  onclick(todo:Todo){
    alert("delete is triggers")
    //i have to change todo arrray -eventemitter
    this.todoDelete.emit(todo)
  }
}
