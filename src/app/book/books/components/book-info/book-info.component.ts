import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mergeMap, Subscription} from "rxjs";
import {BookService} from "../../../services/book.service";
import {BookInterface} from "../../../index";

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
  book!: BookInterface;
  bookSub: Subscription

  constructor(private bookFetchService: BookService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.bookSub = this.route.params.pipe(
      mergeMap(params => {
        return this.bookFetchService.getBookById(params['id']);
      })
    ).subscribe(response => {
      this.book = response
      console.log(this.book)
    })
  }

}
