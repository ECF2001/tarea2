import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoria, SaveCategoriaDto } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'categorias'; 

  getAll(): Observable<ICategoria[]> {
    var test = this.http.get<ICategoria[]>(this.baseUrl);
    return test;
  }

  getById(id: number): Observable<ICategoria> {
    return this.http.get<ICategoria>(`${this.baseUrl}/${id}`);
  }

  create(dto: SaveCategoriaDto): Observable<ICategoria> {
    return this.http.post<ICategoria>(this.baseUrl, dto);
  }

  update(id: number, dto: SaveCategoriaDto): Observable<ICategoria> {
    return this.http.put<ICategoria>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
