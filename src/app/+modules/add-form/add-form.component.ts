import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Item } from './item.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  @Output() closeDetail: EventEmitter<boolean> = new EventEmitter();
  @Output() itemSubmitted = new EventEmitter<Item>();

  addForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    private fb: FormBuilder
  ) { 
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addForm = this.fb.group({
      nameTask: new FormControl('', [Validators.required])
    })
  }

  save() {
    if (this.addForm.valid) {
      this.itemSubmitted.emit(this.addForm.value);
    }
    this.dialogRef.close(this.addForm);
  }

  backButton() {
    this.closeDetail.emit(true);
    this.dialogRef.close(false);
  }

}
