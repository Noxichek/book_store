import {Component, OnInit} from '@angular/core';
import {AuthorFetchService} from "../../services/author-fetch.service";
import {BookFetchService} from "../../../book/services/book-fetch.service";
import {IAuthor} from "../../interfaces/i-author";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: IAuthor[] = [];
  booksThisAuthor: any[] = []


  constructor(private authorFetchService: AuthorFetchService,
              private bookFetchService: BookFetchService
              ) {
  }

  ngOnInit(): void {
    this.authorFetchService.getAllAuthors().subscribe(response => {
      this.dataSource = response['authors']
      console.log(this.dataSource)

      // this.getBooksOfCurrentAuthor(2)
    })

    this.authorFetchService.getAllBooksOfCurrentAuthor(2).subscribe(response => {
      console.log(response['books'])
    })
  }

  getBooksOfCurrentAuthor(authorID: number) {
    let books = []
    let booksOfCurrentAuthor = []

    this.bookFetchService.getAllBooks().subscribe(response => {
      books = response['books']
      booksOfCurrentAuthor = books.filter(el => el.author_id === authorID)
      booksOfCurrentAuthor.forEach(el => this.booksThisAuthor.push(el.title))
      console.log(this.booksThisAuthor)
      this.dataSource.find(el => el.id === authorID).books = this.booksThisAuthor
    })
  }


}
