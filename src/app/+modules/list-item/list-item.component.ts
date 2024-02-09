import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() rawList: any[];
  @Input() options: any = {
    completable: true
  };
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() itemDeleted: EventEmitter<void> = new EventEmitter<void>();
  itemList: any[] = [];
  currentFilter: string = 'all';


  constructor() { }

  ngOnInit(): void {
    if(this.rawList && this.rawList.length) {
      this.itemList = this.rawList;
      this.itemList.sort((a, b) => (a.completado === b.completado) ? 0 : a.completado ? 1 : -1);
    }
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.filterChanged.emit(filter);
  }

  getFilteredItems() {
    switch(this.currentFilter) {
      case 'all':
        return this.itemList;
      case 'pending':
        return this.itemList.filter(item => !item.completado);
      case 'completed':
        return this.itemList.filter(item => item.completado);
      default:
        return this.itemList;
    }
  }

  onCardCheckboxChange(checked: boolean, item: any) {
    item.completado = checked;
    this.itemList = this.itemList.filter(i => i !== item);
    checked ? this.itemList.push(item) : this.itemList.unshift(item);

    const filteredAndSortedItems = this.itemList
      .filter(item => !item.completado)
      .sort((a, b) => a.id > b.id ? 1 : -1);

    this.itemList = filteredAndSortedItems.concat(this.itemList.filter(item => item.completado));
  }

  addItem(id, title) {
    const fechaFormateada = new Date().toLocaleDateString('es-ES');
    this.itemList.push({id, title, date: fechaFormateada});
  }

  deleteItem(itemData) {
    this.itemList = this.itemList.slice().filter(item => item.id !== itemData.id);
    this.itemDeleted.emit();
  }
}
