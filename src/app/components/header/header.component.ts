import { Component, inject, signal } from '@angular/core';
import { PrimarybthComponent } from '../primarybth/primarybth.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [PrimarybthComponent],
  template: `
    <div class="bg-slate-300 px-4 py-3  shadow-2xl flex justify-between items-center">
    <span>My Store</span>
    <app-primarybth 
    [label] ="'Cart(' + cartService.cart().length + ')'"
    
    (btnClicked)="showButtonClicked()"
    />
    </div>
  `,
  styles: `
 
  `
})
export class HeaderComponent {

  // cart=signal("ajshgksdlf")

  cartService =inject(CartService)
  showButtonClicked(){
    console.log("show buton clicked");
    
  }
}
