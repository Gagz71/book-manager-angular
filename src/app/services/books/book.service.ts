import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Book} from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: BehaviorSubject<Array<Book>>;

  constructor() {
    const booksToPush = [
      new Book('Titre 1', 'Auteur 1', 'Libre'),
      new Book('Titre 2', 'Auteur 2', 'Libre'),
      new Book('Titre 3', 'Auteur 3', 'Pris'),
      new Book('Titre 4', 'Auteur 4', 'Libre'),
      new Book('Titre 5', 'Auteur 5', 'Pris'),
      new Book('Titre 6', 'Auteur 6', 'Libre'),
    ];
    this.books = new BehaviorSubject<Array<Book>>(booksToPush);
  }

  getBookById(bookId: number): Promise<Book> {
    return new Promise<Book>(
      (res, rej) => {

        const books = this.books.getValue();

        for (let book of books) {
          if (book.id === bookId) {
            res(book);
            break;
          }
        }
      }
    );
  }

  addBook(bookToAdd: Book): Promise<void> {

    return new Promise<void>(
      (res, rej) => {

        setTimeout(() => {

          const books = this.books.getValue();
          books.push(bookToAdd);
          this.books.next(books);
          res();

        }, 500);

      }
    );
  }

  editBook(editedBook: Book): Promise<void> {

    return new Promise<void>(
      (res, rej) => {

        setTimeout(() => {

          const books = this.books.getValue();

          for (let [index, book] of books.entries()) {
            if (book.id === editedBook.id) {
              books[index] = editedBook;
              this.books.next(books);
              res();
              break;
            }
          }

        }, 500);

      }
    );

  }

  switchAllStatus(newStatus: string) {
    // On récupère la copie qui est en cache
    const booksToEdit = this.books.getValue();

    // On travaille sur les livres
    booksToEdit.forEach(book => book.status = newStatus);

    // On envoie (avec next) la nouvelle valeur à tous ceux qui écoutent les modifsS
    this.books.next(booksToEdit);
  }

  switchStatus(bookId: number, newStatus: string) {
    const booksToEdit = this.books.getValue();

    for (let [index, book] of booksToEdit.entries()) {
      if (book.id === bookId) {
        const tmp = new Book(book.title, book.author,
          newStatus);
        book.status = newStatus;
        this.books.next(booksToEdit);
        break;
      }
    }
  }

  deleteBook(bookIdToDelete: number) {

    const books = this.books.getValue();

    for (let [index, book] of books.entries()) {
      if (book.id === bookIdToDelete) {
        books.splice(index, 1);
        this.books.next(books);
        break;
      }
    }



  }

/*  addTheCom( com:Commentary,theShow:Show):Promise<void>{
    return new Promise<void>(
      (res,rej)=>{
         const theShow =  this.getShowById(show.id);
         const shows = this.shows.getValue();
         for(let show of shows){
           if(show.id === theShow.id){
             show.comments.unshift(com);
           }
         }
         res();
      }
      )
  }*/
}

