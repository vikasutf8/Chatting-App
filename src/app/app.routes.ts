import { Routes } from '@angular/router';
import { ProductcardComponent } from './pages/productlist/productcard/productcard.component';
import { ProductlistComponent } from './pages/productlist/productlist.component';
import { CartyComponent } from './components/carty/carty.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:"full",
        component: ProductlistComponent
    },
    {
        path:"cart",
        component: CartyComponent
    }
];
