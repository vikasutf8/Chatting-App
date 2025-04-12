import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartitemsComponent } from "./cartitems/cartitems.component";
@Component({
  selector: 'app-carty',
  imports: [CartitemsComponent],
  template: `
    <div class="p-6 flex flex-col gap-4">
      <h2 class="text-2xl">Your Shopping </h2>
      @for (items of cartService.cart(); track items.id) {
        <app-cartitems [items]="items"/>
      }
    </div>
  `,
  styles: ``
})
export class CartyComponent {

  cartService =inject(CartService)
}
