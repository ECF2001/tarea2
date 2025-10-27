import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ICategoria, SaveCategoriaDto } from '../../interfaces';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriasListComponent } from '../../components/categorias/categorias-list/categorias-list.component';
import { CategoriaFormComponent } from '../../components/categorias/categorias-form/categoria-form.component';

@Component({
  selector: 'app-categorias-page',
  standalone: true,
  imports: [CommonModule, CategoriasListComponent, CategoriaFormComponent],
  templateUrl: './categorias.page.html',
})
export default class CategoriasPage {
  private svc = inject(CategoriaService);

  categorias = signal<ICategoria[]>([]);
  loading = signal<boolean>(false);
  showForm = signal<boolean>(false);
  editing = signal<ICategoria | null>(null);

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
          this.categorias.set(items);
        },
        error: err => console.error('Error loading categorias', err)
      });
  }

  openCreate(): void {
    this.editing.set(null);
    this.showForm.set(true);
  }

  openEdit(cat: ICategoria): void {
    this.editing.set(cat);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  save = (dto: SaveCategoriaDto): void => {
    const isEdit = !!this.editing();
    const obs = isEdit
      ? this.svc.update(this.editing()!.id, dto)
      : this.svc.create(dto);

    obs.subscribe({
      next: () => {
        this.load();
        this.showForm.set(false);
      },
      error: err => console.error('Error saving categoria', err)
    });
  };

  delete(cat: ICategoria): void {
    if (!confirm(`¿Eliminar categoría #${cat.id}: ${cat.nombre}?`)) return;
    this.svc.delete(cat.id).subscribe({
      next: () => this.load(),
      error: err => console.error('Error deleting categoria', err)
    });
  }
}
