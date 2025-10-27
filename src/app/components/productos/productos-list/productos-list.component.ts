import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProducto } from '../../../interfaces/index';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.scss'
})
export class ProductosListComponent {
  @Input() title: string = 'Productos';
  @Input() productos: IProducto[] = [];
  @Output() callModalAction = new EventEmitter<IProducto>();
  @Output() callDeleteAction = new EventEmitter<IProducto>();
}
