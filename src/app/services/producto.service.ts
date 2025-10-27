import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducto, SaveProductoDto } from '../interfaces/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'productos';

  getAll(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.baseUrl);
  }

  getById(id: number): Observable<IProducto> {
    return this.http.get<IProducto>(`${this.baseUrl}/${id}`);
  }

  create(dto: SaveProductoDto): Observable<IProducto> {
    return this.http.post<IProducto>(this.baseUrl, dto);
  }

  update(id: number, dto: SaveProductoDto): Observable<IProducto> {
    return this.http.put<IProducto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
