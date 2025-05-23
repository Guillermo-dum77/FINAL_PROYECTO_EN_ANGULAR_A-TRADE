import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'shop', component: ShopComponent }
];
