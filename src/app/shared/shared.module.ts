import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { ListItemComponent } from '@app/+modules/list-item/list-item.component';
import { CardComponent } from '@app/+modules/card/card.component';
import { AddFormComponent } from '@app/+modules/add-form/add-form.component';
/**
 * This module should not contain providers (they'd be on core module)
 * and must be imported on every module from (+modules) so as
 * to use its elements (components, directives and pipes)
 *
 * This module also exports Flex Layout and Material resources from
 * visuals module, so it is mandatory to import it on every module
 * from (+modules) that needs to use them
 */
@NgModule({
  declarations: [
    /* Components, directives and pipes to be shared */
    EmptyDataComponent,
    ListItemComponent,
    CardComponent,
    AddFormComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule, InfiniteScrollModule],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    /* Components, directives and pipes to be shared */
    FlexLayoutModule,
    InfiniteScrollModule,
    EmptyDataComponent,
    ListItemComponent,
    CardComponent,
    AddFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        /* In case (rare) we want to share providers too, we'll use the .forRoot() method when importing the module*/
      ]
    };
  }
}
