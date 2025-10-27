import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias-list.component.html'
})
export class CategoriasListComponent {
  @Input() title: string = 'Categorías';
  @Input() categorias: ICategoria[] = [];
  @Output() callModalAction = new EventEmitter<ICategoria>();
  @Output() callDeleteAction = new EventEmitter<ICategoria>();
}
