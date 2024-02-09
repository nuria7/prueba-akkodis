import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUrls } from 'src/config/app-urls.config';

export const routes: Routes = [
  {
    path: AppUrls.AppHome,
    loadChildren: () => import('@modules/home/home.module').then((m) => m.HomeModule),
    title: 'Prueba tecnica - Home'
  },
  {
    path: '**',
    redirectTo: AppUrls.AppHome,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
