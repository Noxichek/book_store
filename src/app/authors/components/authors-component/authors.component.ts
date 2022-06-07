import { Component, OnInit } from '@angular/core';
import {FetchService} from "../../../../services/fetch.service";
import {Author} from "../../../interfaces/interfaces";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: Author[]


  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
    console.log(this.dataSource)
    this.fetchService.getAllAuthors().subscribe(response => {
      this.dataSource = response['authors']
    })
  }



}
