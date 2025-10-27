import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategoria, SaveCategoriaDto } from '../../../interfaces';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() show = false;
  @Input() model: ICategoria | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<SaveCategoriaDto>();

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(120)]],
    descripción: ['', [Validators.required, Validators.maxLength(500)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      if (this.model) {
        this.form.patchValue({
          nombre: this.model.nombre,
          descripción: this.model['descripción']
        });
      } else {
        this.form.reset();
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: SaveCategoriaDto = {
      nombre: this.form.value.nombre!,
      ['descripción']: this.form.value['descripción']!
    };

    this.submitted.emit(dto);
  }
}
