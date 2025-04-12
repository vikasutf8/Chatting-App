import { Component, inject, signal } from '@angular/core';
import { PrimarybthComponent } from '../primarybth/primarybth.component';
import { CartService } from '../../services/cart.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimarybthComponent,RouterLink],
  template: `
    <div class="bg-slate-300 px-4 py-3  shadow-2xl flex justify-between items-center">
    <span routerLink="/">My Store</span>
    <app-primarybth 
    [label] ="'Cart(' + cartService.cart().length + ')'"
    routerLink="/cart"
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
