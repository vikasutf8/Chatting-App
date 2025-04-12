import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'  //globally available
})
export class CartService {
  cart =signal<Product[]>([
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
      "stock": 7
    },
  ])

  addToCart(product :Product){
    this.cart.set([...this.cart(),product]);
    
  }

  removeFromcart(id :number){
    this.cart.set(this.cart().filter((p)=>p.id !== id))
  }
  constructor() { }
}
