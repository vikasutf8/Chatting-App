import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { PrimarybthComponent } from '../../primarybth/primarybth.component';
import { ButtonComponent } from "../../button/button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cartitems',
  imports: [PrimarybthComponent, ButtonComponent],
  template: `
    <div
      class="bg-white shadow-2xl border  rounded-2xl p-3 flex flex-col relative"
    >
      <div class=" flex flex-row gap-4 justify-between items-center ">
        <img [src]="items().image" class="w-[100px] h-[100px] " />
        <div class="flex flex-col ">
          <span class="text-bold text-lg">{{ items().title }}</span>
          <span class="text-gray-500">{{ '$' + items().price }}</span>
        </div>
        <app-button
        label="Remove"
        (btnClicked)="cartService.removeFromcart(items().id
        )"
        />
      </div>
      <span class="absolute top-3 right-3 text-sm">
        @if (items().stock ==0 || items().stock ==null) {
        <span class="text-red-400">Out of Stock</span>
        } @else {
        <span class="text-green-700">{{ items().stock }} left</span>
        }
      </span>
    </div>
  `,
  styles: ``,
})
export class CartitemsComponent {
  items = input.required<Product>();

  cartService =inject(CartService)


}
