import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AddFormComponent } from '../add-form/add-form.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { Item } from '../add-form/item.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ListItemComponent) listItemComponent: ListItemComponent;
  asyncListItems: Observable<Item[]>;
  selectedFilter: string = 'all'; 

  public itemList: any = [
    {
      id: 1,
      title: "Crear un componente de carrusel de imágenes para la página de inicio.",
      date: 'Mon Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)',
      completado: false
    },
    {
      id: 2,
      title: "Solucionar un problema de diseño en la versión móvil de la aplicación.",
      date: 'Wed Jan 31 2024 15:52:16 GMT+0100 (Central European Standard Time)',
      completado: false
    },
    {
      id: 3,
      title: "Realizar pruebas de integración en la interfaz de usuario para garantizar el buen funcionamiento de la aplicación.",
      date: 'Thu Jan 29 2024 15:52:16 GMT+0100 (Central European Standard Time)',
      completado: true
    },
    {
      id: 4,
      title: "Refactorizar el diseño de una página para mejorar la usabilidad.",
      date: 'Thu Feb 01 2024 15:52:16 GMT+0100 (Central European Standard Time)',
      completado: false
    },
    {
      id: 5,
      title: "Resolver un error de TypeScript que afecta a la funcionalidad de un formulario.",
      date: 'Thu Feb 01 2024 15:52:16 GMT+0100 (Central European Standard Time)',
      completado: true
    }
  ]
  
  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.asyncListItems = of(this.itemList);
  }

  openModalItem() {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '400px',
      height: '400px'
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.itemList.push({
          id: this.itemList.length + 1,
          title: result.value.nameTask,
          date: new Date()
        });
      }
    });
  }

  setFilterType(filterType: string) {
    this.listItemComponent.setFilter(filterType);
  }
  
  handleFilterChange(filter: string) {
  }

  handleItemDeleted() {
    
  }
}
