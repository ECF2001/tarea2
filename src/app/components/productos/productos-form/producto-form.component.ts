import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProducto, SaveProductoDto } from '../../../interfaces/index';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() show = false;
  @Input() model: IProducto | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<SaveProductoDto>();

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(120)]],
    descripción: ['', [Validators.required, Validators.maxLength(500)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [null as number | null, [Validators.required]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      if (this.model) {
        this.form.patchValue({
          nombre: this.model.nombre,
          descripción: this.model['descripción'],
          precio: this.model.precio,
          stock: this.model.stock,
        });
      } else {
        this.form.reset({ precio: 0, stock: 0, categoriaId: null });
      }
    }
  }

    onSubmit(): void {
    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    const dto: any = {
        nombre: this.form.value.nombre!,
        ['descripción']: this.form.value['descripción']!,
        precio: this.form.value.precio!,
        stock: this.form.value.stock!,
        categoria: { id: this.form.value.categoriaId! } 
    };

    this.submitted.emit(dto);
    }
}