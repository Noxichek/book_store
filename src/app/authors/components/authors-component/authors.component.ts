import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorService} from "../../services/author.service";
import {IAuthor} from "../../interfaces/author.interface";
import {forkJoin, map, pluck, Subject, switchMap, takeUntil, tap} from "rxjs";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: IAuthor[] = [];
  private unsubscribeOnDestroy$ = new Subject<boolean>();


  constructor(private authorFetchService: AuthorService,
  ) {
  }

  ngOnInit(): void {
    this.loadData(1)
  }

  loadData(page: number) {
    this.authorFetchService.getAuthorsFromPageNumber(page)
      .pipe(
        takeUntil(this.unsubscribeOnDestroy$),
        pluck('authors'),
        tap((x: IAuthor[]) => {
          this.dataSource = x
        }),
        switchMap(response => {
          const authorBookRequest = response.map(el => {
            return this.authorFetchService.getAllBooksOfCurrentAuthor(el.id)
          })
          return forkJoin(authorBookRequest)
        }),
        map(response => {
          return response.map(el => {
            return el['books']
          })
        })
      )
      .subscribe(response => {
        this.dataSource = this.dataSource.map((el, index) => {
          return {...el, books: response[index]}
        })
        console.log(this.dataSource)
      })
  }

  changePage(pageNumber: PageEvent) {
    this.loadData(++pageNumber.pageIndex)
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next(true)
  }
}
