import { Component, signal } from '@angular/core';
import { PrimarybthComponent } from '../primarybth/primarybth.component';

@Component({
  selector: 'app-header',
  imports: [PrimarybthComponent],
  template: `
    <div class="bg-slate-300 px-4 py-3  shadow-2xl flex justify-between items-center">
    <span>My Store</span>
    <app-primarybth 
    label ="Cart"
    
    (btnClicked)="showButtonClicked()"
    />
    </div>
  `,
  styles: `
 
  `
})
export class HeaderComponent {

  // cart=signal("ajshgksdlf")
  showButtonClicked(){
    console.log("show buton clicked");
    
  }
}
