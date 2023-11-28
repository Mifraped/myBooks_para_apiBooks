import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../models/book';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  public libros: Book[] = [];

  private url = 'http://localhost:3000/books';

  constructor(private toastr: ToastrService, private http: HttpClient, private usuarioService: UsuarioService) {}

  public getAll(): Observable<object> {
    return this.http.get(this.url + `?id_user=${this.usuarioService.user.id_user}`);
  }

  public getOne(id_libro: number): Observable<object> {
    return this.http.get(this.url + `?id_user=${this.usuarioService.user.id_user}` + `&id_book=${id_libro}`);
  }

  public add(book: Book): Observable<object> {
    return this.http.post(this.url, book);
  }

  public edit(book: Book): Observable<object> {
    return this.http.put(this.url, book);
  }

  public delete(id_libro: number): Observable<object> {
    return this.http.delete(this.url + `?id_user=${this.usuarioService.user.id_user}` + `&id_book=${id_libro}`);
  }
}
