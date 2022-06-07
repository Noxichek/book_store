import {Component, Input, OnInit} from '@angular/core';
import {Author, Book} from "../../../interfaces/interfaces";
import {FetchService} from "../../../../services/fetch.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})

export class BookCardComponent implements OnInit {
  // @Input() set book(value: Book | null) {
  //   this.currentBook = {...value, imageUrl: this.images[this.setRandomImage()]}
  //   this.getAuthorFullName()
  // }

  @Input() currentBook: Book;

  // public currentBook: Book;
  public author: Author = {} as Author;
  public images = [
    'https://img4.labirint.ru/rc/693215546325770a9debd9bf177480e3/363x561q80/books85/844798/cover.png?1652804706',
    'https://img3.labirint.ru/rc/69c5c75fed36685ee1f3319b81b4a337/363x561q80/books86/856141/cover.jpg?1653917175',
    'https://img4.labirint.ru/rc/cc4da2d8b7bdef4ba97f7a4331e2ddd6/363x561q80/books86/857240/cover.jpg?1654518304',
    'https://img3.labirint.ru/rc/58f081c9271676093e058840117ff025/363x561q80/books85/848703/cover.png?1654003504',
    'https://img4.labirint.ru/rc/52e7fa9f1df0cc0195c38f1d2129e3ae/363x561q80/books86/854346/cover.png?1654003508',
    'https://img4.labirint.ru/rc/859d4ab7c371befc9970e36f74c7bf9e/363x561q80/books86/851546/cover.jpg?1653978357',
    'https://img3.labirint.ru/rc/e278c77780621038ff169223052efc99/363x561q80/books85/843211/cover.png?1649424308',
    'https://img4.labirint.ru/rc/606bf5d4ed35901661be848c35f04009/363x561q80/books84/838050/cover.png?1652340314',
    'https://img3.labirint.ru/rc/d794c05724829c34e3a130e8d579ad7f/363x561q80/books86/854875/cover.jpg?1650277510',
    'https://img4.labirint.ru/rc/b36c001949f85c14def125c176a6cfe4/363x561q80/books80/794042/cover.jpg?1615357513'
  ]

  constructor(private fetchService: FetchService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.getAuthorFullName()
  }

  getAuthorFullName() {
    const {author_id} = this.currentBook;

    this.fetchService.getAuthorById(author_id).subscribe(response => {
      this.author = response
    })
  }

  setRandomImage() {
    const min = Math.ceil(0);
    const max = Math.floor(11);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  goToInfo(id:number) {
    this.router.navigate([`books/${id}`])
  }
}
