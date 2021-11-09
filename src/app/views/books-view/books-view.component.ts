import {Book} from '../../models/book.model';
import {Subscription} from 'rxjs';
import {BookService} from '../../services/books/book.service';

import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-books-view',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.css']
})
export class BooksViewComponent implements OnInit, OnDestroy {

  books: Array<Book>;
  booksSub: Subscription;

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    this.booksSub = this.bookService.books.subscribe(
      (books: Array<Book>) => {
        this.books = books;
      }
    );
  }

  onClickSwitchAllStatus(newStatus: string) {
    this.bookService.switchAllStatus(newStatus);
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
