import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { HomeComponent } from './home.component';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../add-form/add-form.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  let component;

  const createComponent = createComponentFactory({
    component: HomeComponent
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should ngOnInit()', () => {
    component.ngOnInit();
    expect(component.asyncListItems).toEqual(of(component.itemList));
  });

  it('should ngOnInit() get itemsData from sessionStorage', () => {
    const mockItemsData = JSON.stringify([{ id: 1, title: 'Item 1' }, { id: 2, title: 'Item 2' }]);
    sessionStorage.setItem('itemsData', mockItemsData);

    component.ngOnInit();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('itemsData');
  });


  it('should add an item to itemList when dialogRef is closed with a result', () => {
    const mockDialogRef = { afterClosed: jest.fn(() => of({ value: { nameTask: 'Task Name' } })) };
    spectator.inject(MatDialog).open.andReturn(mockDialogRef);

    component.addItem();

    expect(spectator.inject(MatDialog).open).toHaveBeenCalledWith(AddFormComponent, {
      width: '400px',
      height: '400px',
    });
    expect(mockDialogRef.afterClosed).toHaveBeenCalled();
    expect(component.itemList.length).toBe(1);
    expect(component.itemList[0].id).toBe(1);
    expect(component.itemList[0].title).toBe('Task Name');
  });
});
