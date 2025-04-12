import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primarybth',
  imports: [],
  template: `
    <p>
    <button (click)="btnClicked.emit()"
    class="bg-slate-300 px-5 py-2 shadow-2xl rounded-2xl border-2 border-slate-400 hover:border-slate-300 hover:duration-200 cursor-pointer">
      {{label()}}
      
    </button>

    </p>
  `,
  styles: ``
})
export class PrimarybthComponent {
  label =input("")  // signal so uses where we watn

  btnClicked= output();

 
}
