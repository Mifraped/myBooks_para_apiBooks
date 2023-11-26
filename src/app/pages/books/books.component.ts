import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Respuesta } from 'src/app/models/respuesta';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  public cargando: boolean = true;
  public buscando: boolean = false;
  @ViewChild('ref') ref: ElementRef;

  constructor(
    public bookService: BooksService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.muestraLibros();
  }

  public muestraLibros() {
    this.bookService.getAll().subscribe((resp: Respuesta) => {
      if (resp.error) {
        this.toastr.error(`${resp.message}`);
        this.cargando = false;
      } else {
        this.bookService.libros = resp.data;
        this.cargando = false;
        this.buscando = false;
      }
    });
  }

  public buscaLibro(inpRef: HTMLInputElement) {
    this.bookService
      .getOne(Number(inpRef.value))
      .subscribe((resp: Respuesta) => {
        if (inpRef.value) {
          if (resp.error) {
            this.toastr.error(resp.message);
          } else {
            this.buscando = true;
            this.bookService.libros = resp.data;
          }
        } else {
          this.buscando = false;
          this.cargando = true;
          this.muestraLibros();
        }
      });
  }

  public eliminaTargeta(id_libro: number) {
    this.bookService.delete(id_libro).subscribe((resp: Respuesta) => {
      if (resp.error) {
        this.toastr.error(resp.message);
      } else {
        this.toastr.success(resp.message);
        this.buscando = false;
        this.cargando = true;
        this.ref.nativeElement.value = '';
        this.bookService.libros = resp.data;
        this.muestraLibros();
      }
    });
  }
}
