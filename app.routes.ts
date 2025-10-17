import { Routes } from '@angular/router';
// import path from 'node:path';
// Make sure the file exists at the specified path, or update the path if necessary
import { Register } from './register/register';
import { Update } from './update/update';
import { Login } from './login/login';
import { Homepage } from './homepage/homepage';
import { Contactus } from './contactus/contactus';
import { Products } from './products/products';
import {  Cart } from './cart/cart';
import { Admin } from './admin/admin';
import { ProductService } from './product.service';
import { UserTypeSelection } from './user-type-selection/user-type-selection';
import { PaymentComponent } from './payment/payment';
import { Adminlogin } from './adminlogin/adminlogin';
import { Adminregister } from './adminregister/adminregister';





export const routes: Routes = [
    {path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Default route
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    {path:"update/:uid",component:Update},
    {path:"homepage", component:Homepage},
    {path:"contactus", component:Contactus},
    {path:"products", component:Products},
    {path:'cart', component:Cart},
    {path:'admin',component:Admin},
    {path:'productService',component:ProductService},
    { path: 'select-user-type', component: UserTypeSelection },
    {path: 'payment', component: PaymentComponent},
    {path: 'adminlogin', component: Adminlogin},
    {path: 'adminregister', component: Adminregister}

    

];


