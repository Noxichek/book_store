import {Component, OnInit} from '@angular/core';
import {FetchService} from "../../../../services/fetch.service";
import {Author} from "../../../interfaces/interfaces";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: Author[] = [];
  booksThisAuthor: any[] = []


  constructor(private fetchService: FetchService) {
  }

  ngOnInit(): void {
    this.fetchService.getAllAuthors().subscribe(response => {
      this.dataSource = response['authors']
      console.log(this.dataSource)

      this.getBooksOfCurrentAuthor(1)
    })


  }

  getBooksOfCurrentAuthor(authorID: number) {
    let books = []
    let booksOfCurrentAuthor = []

    this.fetchService.getAllBooks().subscribe(response => {
      books = response['books']
      booksOfCurrentAuthor = books.filter(el => el.author_id === authorID)
      booksOfCurrentAuthor.forEach(el => this.booksThisAuthor.push(el.title))
      console.log(this.booksThisAuthor)
      this.dataSource.find(el => el.id === authorID).books = this.booksThisAuthor
    })
  }


}
