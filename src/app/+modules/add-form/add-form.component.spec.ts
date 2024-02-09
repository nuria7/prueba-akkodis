import { AddFormComponent } from './add-form.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

describe('AddFormComponent', () => {
  let spectator: Spectator<AddFormComponent>;
  let component;

  const createComponent = createComponentFactory({
    component: AddFormComponent,
    shallow: true,
    imports: [
      RouterTestingModule
    ],
    declarations: [FormBuilder]
  })

  beforeEach(() => {
    spectator = createComponent({
      props: {
        closeDetail: new EventEmitter(),
        itemSubmitted: new EventEmitter()
      }
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit()', () => {
    component.ngOnInit();
    expect(component.addForm).toBeInstanceOf(FormGroup);
  });

  it('should initForm()', () => {
    const formBuilder = spectator.inject(FormBuilder);
    const groupSpy = jest.spyOn(formBuilder, 'group');

    component.initForm();
    expect(groupSpy).toHaveBeenCalledWith({
      nameTask: new FormControl('', [Validators.required]),
    });
  });

  it('should save()', () => {
    const formValue = { nameTask: 'Task Name' };
    component.addForm.setValue(formValue);

    component.save();
    expect(component.itemSubmitted.emit).toHaveBeenCalledWith(formValue);
    expect(spectator.inject(MatDialogRef).close).toHaveBeenCalledWith(component.addForm);
  });

  it('should save() not emit', () => {
    component.addForm.setErrors({ invalid: true });
    component.save();
    expect(component.itemSubmitted.emit).not.toHaveBeenCalled();
    expect(spectator.inject(MatDialogRef).close).not.toHaveBeenCalled();
  });

  it('should backButton()', () => {
    component.backButton();
    expect(component.closeDetail.emit).toHaveBeenCalledWith(true);
    expect(spectator.inject(MatDialogRef).close).toHaveBeenCalledWith(false);
  });
});
