import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const rootRouters: Routes = [{ path: 'auth', component: AuthComponent }];
@NgModule({
  imports: [RouterModule.forChild(rootRouters)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
