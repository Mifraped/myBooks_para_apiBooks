import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Respuesta } from 'src/app/models/respuesta';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() libroPadre: Book;
  @Input() even: boolean;

  @Output() eventoElimTarg = new EventEmitter<number>();

  constructor(public bookService: BooksService) {}

  public eliminaTargeta(id_libro: number) {
    this.eventoElimTarg.emit(Number(id_libro));
  }

  // public elimina(id_libro: number) {
  //   this.bookService.delete(id_libro).subscribe((resp: Respuesta) => {

  //   });
  // }
}
