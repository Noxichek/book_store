import { Component, OnInit } from '@angular/core';
import {FetchService} from "../../../../services/fetch.service";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../../interfaces/interfaces";
import {mergeMap, Subscription} from "rxjs";

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
  book!: Book;
  bookSub: Subscription

  constructor(private fetchService: FetchService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.bookSub = this.route.params.pipe(
      mergeMap(params => {
        return this.fetchService.getBookById(params['id']);
      })
    ).subscribe(response => {
      this.book = response
      console.log(this.book)
    })
  }

}
