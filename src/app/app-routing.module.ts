import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./user/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/edit-pages/edit-pages.module').then(
        m => m.EditPagesModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
