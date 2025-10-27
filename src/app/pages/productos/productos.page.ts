import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProducto, SaveProductoDto } from '../../interfaces/index';
import { ProductoService } from '../../services/producto.service';
import { ProductosListComponent } from '../../components/productos/productos-list/productos-list.component';
import { ProductoFormComponent } from '../../components/productos/productos-form/producto-form.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [CommonModule, ProductosListComponent, ProductoFormComponent],
  templateUrl: './productos.page.html',
})
export default class ProductosPage {
  private svc = inject(ProductoService);

  productos = signal<IProducto[]>([]);
  loading = signal<boolean>(false);

  showForm = signal<boolean>(false);
  editing = signal<IProducto | null>(null);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.svc.getAll()
  .pipe(finalize(() => this.loading.set(false)))
  .subscribe({
    next: (res: any) => {
      const items = Array.isArray(res) ? res : (res?.data ?? []);
      this.productos.set(items);
    },
    error: err => console.error('Error loading productos', err)
  });
  }

  openCreate(): void {
    this.editing.set(null);
    this.showForm.set(true);
  }

  openEdit(prod: IProducto): void {
    this.editing.set(prod);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  save = (dto: SaveProductoDto): void => {
    const isEdit = !!this.editing();
    const obs = isEdit
      ? this.svc.update(this.editing()!.id, dto)
      : this.svc.create(dto);

    obs.subscribe({
      next: saved => {
        this.load();
        this.showForm.set(false);
      },
      error: err => console.error('Error saving producto', err)
    });
  };

  delete(prod: IProducto): void {
    if (!confirm(`¿Eliminar producto #${prod.id}: ${prod.nombre}?`)) return;
    this.svc.delete(prod.id).subscribe({
      next: () => this.load(),
      error: err => console.error('Error deleting producto', err)
    });
  }
}
