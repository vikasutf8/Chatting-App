import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProductlistComponent } from "./pages/productlist/productlist.component";
import { ProductcardComponent } from "./pages/productlist/productcard/productcard.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,RouterOutlet],
  template: `
   <app-header/>
<router-outlet></router-outlet>

   
  `,
  styles: ``,
})
export class AppComponent {
  title = 'angular-ecomm';
}
