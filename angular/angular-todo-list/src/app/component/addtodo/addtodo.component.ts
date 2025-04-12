import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../todos';

@Component({
  selector: 'app-addtodo',
  imports: [FormsModule],
  templateUrl: './addtodo.component.html',
  styleUrl: './addtodo.component.css'
})
export class AddtodoComponent  implements OnInit{
  title! :string;
  desc!: string;
  @Output() todoAdd :EventEmitter<Todo> =new EventEmitter();
  constructor(){
    

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  onSubmit(){
    const todos ={
      sno :2,
      title : this.title,
      desc :this.desc,
      active :true

    }
    this.todoAdd.emit(todos);
   }

}
