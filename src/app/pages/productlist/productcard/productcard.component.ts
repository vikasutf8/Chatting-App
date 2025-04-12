import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { PrimarybthComponent } from "../../../components/primarybth/primarybth.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-productcard',
  imports: [PrimarybthComponent],
  template: `
    <div class="bg-white shadow-2xl border  rounded-2xl p-3 flex flex-col relative">
     <div class="mx-auto flex flex-col gap-2">
     <img [src]="product().image" class="w-[200px] h-[200px] "/>
     {{product().title}}
     <span class="text-gray-500">{{'$' +product().price}}</span>

     <app-primarybth label="Add to card" class="flex justify-center"
      (btnClicked)="cartService.addToCart(product())"
     />
     </div>
     <span class="absolute top-3 right-3 text-sm">
      @if (product().stock ==0 ||  product().stock ==null) {
        <span class="text-red-400">Out of Stock</span>
      }
      @else {
        <span class="text-green-700">{{product().stock}} left</span>
      }
     </span>
    </div>
  `,
  styles: ``
})
export class ProductcardComponent {

  cartService =inject(CartService);
  product = input.required<Product>();

}
