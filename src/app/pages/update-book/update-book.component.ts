import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Respuesta } from 'src/app/models/respuesta';
import { BooksService } from 'src/app/shared/books.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
  constructor(
    public bookService: BooksService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) {}

  public edita(
    titulo: HTMLInputElement,
    genero: HTMLInputElement,
    autor: HTMLInputElement,
    precio: HTMLInputElement,
    url: HTMLInputElement,
    idLibro: HTMLInputElement
  ) {
      let nuevoLibro = new Book(
        titulo.value ? titulo.value : null,
        genero.value ? genero.value :  null,
        autor.value ? autor.value :  null,
        precio.value? Number(precio.value) : null,
        url.value ? url.value :  null,
        this.usuarioService.user.id_user
      );
      nuevoLibro.id_book = Number(idLibro.value)
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
  }
}
