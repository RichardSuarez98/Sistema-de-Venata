import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/Security/auth.guard';
////AQUI ESTA EL CAN ACTIVATE
const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'  },
  {path:'login', component:LoginComponent},//,canActivate:[AuthGuard]
  {path:'dashboard',canActivate:[AuthGuard],loadChildren:()=>import ('./components/dashboard/dashboard.module').then(x=>x.DashboardModule)},
  {path: '**',redirectTo:'login',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
