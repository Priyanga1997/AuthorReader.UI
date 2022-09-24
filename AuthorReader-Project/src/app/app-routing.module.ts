import { Host, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PurchaseComponent} from './purchase/purchase.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import {AuthorComponent} from './author/author.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';
import { ReaderLoginComponent } from './reader-login/reader-login.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'reader',component:ReaderComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'author',component:AuthorComponent},
  {path:'purchase',component:PurchaseComponent},
  {path:'readerLogin',component:ReaderLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
