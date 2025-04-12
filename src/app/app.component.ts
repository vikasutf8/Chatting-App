import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProductlistComponent } from "./pages/productlist/productlist.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ProductlistComponent],
  template: `
   <app-header/>
   <app-productlist/>
  `,
  styles: ``,
})
export class AppComponent {
  title = 'angular-ecomm';
}
