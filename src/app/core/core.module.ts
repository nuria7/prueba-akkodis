import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {

    if (core) {
      // Avoid loading this module multiple times
      throw new Error('Do not try to load CoreModule multiple times, please. Import it in AppModule only :)');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
      ]
    };
  }
}
