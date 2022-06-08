import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorService} from "../../services/author.service";
import {BookService} from "../../../book/services/book.service";
import {IAuthor} from "../../interfaces/author.interface";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: IAuthor[] = [];
  booksThisAuthor: any[] = [];
  private unsubscribeOnDestroy$ = new Subject<boolean>();


  constructor(private authorFetchService: AuthorService,
              private bookFetchService: BookService
  ) {
  }

  ngOnInit(): void {
    this.authorFetchService.getAllAuthors().pipe(takeUntil(this.unsubscribeOnDestroy$))
      .subscribe(response => {
      this.dataSource = response['authors']
      console.log(this.dataSource)

      // this.getBooksOfCurrentAuthor(2)
    })

    this.authorFetchService.getAllBooksOfCurrentAuthor(2).pipe(takeUntil(this.unsubscribeOnDestroy$))
      .subscribe(response => {
      console.log(response['books'])
    })
  }

  getBooksOfCurrentAuthor(authorID: number) {
    let books = []
    let booksOfCurrentAuthor = []

    this.bookFetchService.getAllBooks()
      .pipe(takeUntil(this.unsubscribeOnDestroy$))
      .subscribe(response => {
      books = response['books']
      booksOfCurrentAuthor = books.filter(el => el.author_id === authorID)
      booksOfCurrentAuthor.forEach(el => {
        this.booksThisAuthor.push(el.title)
      })
      console.log(this.booksThisAuthor)
      this.dataSource.find(el => {
        el.id === authorID;
      }).books = this.booksThisAuthor
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next(true)
  }

}
