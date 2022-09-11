import { Host, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { CreatebookComponent } from './createbook/createbook.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'reader',component:ReaderComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'createbook',component:CreatebookComponent},
  {path:'navigation',component:NavigationComponent},
  {path:'bookdetails',component:BookdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
