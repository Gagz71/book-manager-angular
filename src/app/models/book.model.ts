export class Book {

  private _id: number;
  private _title: string;
  private _author: string;
  private _status: string;

  private static _bookLength = 1;

  constructor(title: string, author: string, status: string) {
    this._id = Book._bookLength;
    this._title = title;
    this._author = author;
    this._status = status;

    Book._bookLength++;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  static get bookLength(): number {
    return this._bookLength;
  }

  static set bookLength(value: number) {
    this._bookLength = value;
  }

}
