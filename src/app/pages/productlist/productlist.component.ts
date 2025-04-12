import { Component, signal } from '@angular/core';
import { single } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductcardComponent } from "./productcard/productcard.component";

@Component({
  selector: 'app-productlist',
  imports: [ProductcardComponent],
  template: `
    <div class="p-8 grid grid-cols-2 md:grid-cols-4  gap-4">
      @for (product of products(); track product.id) {
        <app-productcard [product]="product"/>

      }
    </div>
  `,
  styles: ``
})
export class ProductlistComponent {
  products =signal<Product[]>([
    {
      "id": 1,
      "title": "Wireless Mouse",
      "image": "https://example.com/images/mouse.jpg",
      "price": 999,
      "stock": 25
    },
    {
      "id": 2,
      "title": "Mechanical Keyboard",
      "image": "https://example.com/images/keyboard.jpg",
      "price": 2499,
      "stock": 12
    },
    {
      "id": 3,
      "title": "27-inch Monitor",
      "image": "https://example.com/images/monitor.jpg",
      "price": 15999,
      "stock": 0
    },
    {
      "id": 4,
      "title": "USB-C Hub",
      "image": "https://example.com/images/hub.jpg",
      "price": 1499
    },
    {
      "id": 5,
      "title": "External SSD 1TB",
      "image": "https://example.com/images/ssd.jpg",
      "price": 6499,
      "stock": 18
    }
  ]
  )

}
