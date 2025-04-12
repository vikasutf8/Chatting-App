import { Component, signal } from '@angular/core';
import { single } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductcardComponent } from "./productcard/productcard.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productlist',
  imports: [ProductcardComponent,CommonModule],
  template: `
   <ng-container *ngIf="products().length > 0; else loader">
  <div class="p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
    <app-productcard *ngFor="let product of products(); trackBy: trackById" [product]="product" />
  </div>
</ng-container>

<ng-template #loader>
  <h3>Welcome! Items loading...</h3>
</ng-template>

    
    
  `,
  styles: ``
})
export class ProductlistComponent {
  trackById(index: number, item: Product): number {
    return item.id;
  }
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
