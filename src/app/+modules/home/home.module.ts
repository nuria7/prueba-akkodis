import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeRoutingModule.components],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
