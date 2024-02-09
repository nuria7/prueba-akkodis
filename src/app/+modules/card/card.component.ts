import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../add-form/item.model';

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate(
    '1s ease-out',
    style({
      opacity: 0
    })
  )
])

const fadeOut = trigger('fadeOut', [leaveTrans])

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [fadeOut]
})
export class CardComponent implements OnInit {
  @Input() rawItem: Item;
  @Input() completable: boolean;
  @Output() checkboxChange = new EventEmitter<boolean>();
  @Output() deleteItemEvent = new EventEmitter<void>();
  
  item: any = {};
  itemCompleted: boolean;

  constructor() { }

  ngOnInit(): void {
    if(this.rawItem) {
      this.item = this.rawItem;
    }
  }

  onCheckboxChange(event: any) {
    this.checkboxChange.emit(event.checked);
  }

  deleteItem(value: boolean) {
    this.itemCompleted = value as boolean;
    this.deleteItemEvent.emit();
  }

}
