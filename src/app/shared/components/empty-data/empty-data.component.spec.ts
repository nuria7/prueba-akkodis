import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TranslateModule } from '@ngx-translate/core';

import { EmptyDataComponent } from './empty-data.component';

describe('EmptyDataComponent', () => {
  let spectator: Spectator<EmptyDataComponent>;
  let component;

  const createComponent = createComponentFactory({
    component: EmptyDataComponent,
    shallow: true,
    imports: [TranslateModule.forRoot(), RouterTestingModule.withRoutes([])],
    mocks: []
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        text: 'texto'
      }
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
