import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button (click)="btnClicked.emit()"
    class="bg-slate-300 px-5 py-2 shadow-2xl rounded-2xl border-2 border-slate-400 hover:border-slate-300 hover:duration-200 cursor-pointer">
      {{label()}}
      
    </button>
  `,
  styles: ``
})
export class ButtonComponent {
label =input("")
btnClicked =output()
}
