import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let spectator: Spectator<ListItemComponent>;
  let component;

  const createComponent = createComponentFactory({
    component: ListItemComponent,
    shallow: true,
    imports: [
      RouterTestingModule
    ],
    declarations: [FormBuilder]
  })

  beforeEach(() => {
    spectator = createComponent({
      props: {
        rawList: [],
        options: {completable: true}
      }
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit()', () => {
    const mockRawList = [
      { id: 1, completado: true, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)' },
      { id: 2, completado: false, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)' }
    ];

    component.rawList = mockRawList;
    component.ngOnInit();

    expect(component.itemList).toEqual(mockRawList);
    expect(component.itemList).toEqual([
      { id: 2, completado: false, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)' },
      { id: 1, completado: true, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)' }
    ]);
  });

  it('should ngOnInit() handle empty rawList', () => {
    component.rawList = [];
    component.ngOnInit();
    expect(component.itemList).toEqual([]);
  });

  it('should onCardCheckboxChange()', () => {
    const mockItem = { id: 1, completado: false, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)'  };
    component.itemList = [mockItem];
    component.onCardCheckboxChange(true, mockItem);
    expect(mockItem.completado).toBe(true);
    expect(component.itemList).toEqual([mockItem]);
  });

  it('should addItem()', () => {
    const mockId = 1;
    const mockTitle = 'Task Title';

    component.addItem(mockId, mockTitle);
    const expectedItem = {
      id: mockId,
      title: mockTitle,
      date: expect.any(String)
    };
    expect(component.itemList).toContainEqual(expectedItem);
  });

  it('should deleteItem()', () => {
    const mockItemData = { id: 1, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)' };
    const mockItemToDelete = { id: 1, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)' };
    component.itemList = [mockItemToDelete];
    component.deleteItem(mockItemData);

    expect(component.itemList).not.toContain(mockItemToDelete);
  });

  it('should setItem', () => {
    const mockItemList = [{ id: 1, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)' }, { id: 2, date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)' }];

    component.itemList = mockItemList;
    component.setItem();

    expect(sessionStorage.setItem).toHaveBeenCalledWith('Items', JSON.stringify(mockItemList));
  });
});
