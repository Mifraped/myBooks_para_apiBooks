import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Respuesta } from 'src/app/models/respuesta';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
  constructor(
    public bookService: BooksService,
    private toastr: ToastrService
  ) {}

  public edita(
    titulo: HTMLInputElement,
    genero: HTMLInputElement,
    autor: HTMLInputElement,
    precio: HTMLInputElement,
    url: HTMLInputElement,
    idLibro: HTMLInputElement
  ) {
    if (
      titulo.value &&
      genero.value &&
      autor.value &&
      precio.value &&
      url.value &&
      idLibro.value
    ) {
      let nuevoLibro = new Book(
        titulo.value,
        genero.value,
        autor.value,
        Number(precio.value),
        url.value,
        Number(idLibro.value)
      );
      this.bookService.edit(nuevoLibro).subscribe((resp: Respuesta) => {
        if (resp.error) {
          this.toastr.error(resp.message);
        } else {
          this.toastr.success(resp.message);
          titulo.value = '';
          genero.value = '';
          autor.value = '';
          precio.value = '';
          url.value = '';
          idLibro.value = '';
        }
      });
    } else this.toastr.error('Faltan campos por rellenar');
  }
}
