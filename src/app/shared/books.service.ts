import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../models/book';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  public libros: Book | Book[] = [];

  private url = 'http://localhost:3000/books';

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  public getAll(): Observable<object> {
    return this.http.get(this.url);
  }

  public getOne(id_libro: number): Observable<object> {
    return this.http.get(this.url + `?id=${id_libro}`);
  }

  public add(book: Book): Observable<object> {
    return this.http.post(this.url, book);
  }

  public edit(book: Book): Observable<object> {
    return this.http.put(this.url, book);
  }

  public delete(id_libro: number): Observable<object> {
    return this.http.delete(this.url + `?id=${id_libro}`);
  }
}
