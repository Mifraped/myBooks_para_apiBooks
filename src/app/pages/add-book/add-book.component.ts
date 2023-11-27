import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Respuesta } from 'src/app/models/respuesta';
import { BooksService } from 'src/app/shared/books.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  constructor(
    public bookService: BooksService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  public anyade(titulo: HTMLInputElement, genero: HTMLInputElement, autor: HTMLInputElement, precio: HTMLInputElement, url: HTMLInputElement){
    if(titulo.value && genero.value && autor.value && precio.value && url.value){
      let nuevoLibro = new Book(
        titulo.value,
        genero.value,
        autor.value,
        Number(precio.value),
        url.value,
        Number(this.usuarioService.user.id_user)
      );
      this.bookService.add(nuevoLibro).subscribe((resp: Respuesta) => {
        if (!resp.error) {
          this.toastr.success(resp.message);
          titulo.value = '';
          genero.value = '';
          autor.value = '';
          precio.value = '';
          url.value = '';
          this.router.navigate(["books"])
        } else {
          this.toastr.error(resp.message);
        }
      });
    } else this.toastr.error('Faltan campos por rellenar');
  }
}
