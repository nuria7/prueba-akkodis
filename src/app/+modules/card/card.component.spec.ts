import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Item } from '../add-form/item.model';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let spectator: Spectator<CardComponent>;
  let component;

  const item: Item = {title: 'Titulo nueva tarea', date: '31/01/2024', completado: true};
  const createComponent = createComponentFactory({
    component: CardComponent,
    shallow: true,
    imports: [
      RouterTestingModule
    ],
    declarations: [FormBuilder]
  })

  beforeEach(() => {
    spectator = createComponent({
      props: {
        rawItem: item,
        completable: true,
        checkboxChange: new EventEmitter(true),
        deleteItemEvent: new EventEmitter()
      }
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onCheckboxChange()', () => {
    const mockEvent = { checked: true };
    component.onCheckboxChange(mockEvent);
    expect(component.checkboxChange.emit).toHaveBeenCalledWith(true);
  });

  it('should deleteItem()', () => {
    const mockValue = true;
    component.deleteItem(mockValue);
    expect(component.itemCompleted).toBe(true);
    expect(component.deleteItemEvent.emit).toHaveBeenCalled();
  });
});
