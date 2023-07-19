import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { authGuard } from '@src/app/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPageComponent,
  },
  {
    path: 'menu/edit',
    component: MenuPageComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
