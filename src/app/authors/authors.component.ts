import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    {position: 1, name: 'William Shakespeare', rating: 1.0079, nationality: 'English'},
    {position: 2, name: 'Agatha Christie', rating: 4.0026, nationality: 'British'},
    {position: 3, name: 'Barbara Cartland', rating: 6.941, nationality: 'British'},
    {position: 4, name: 'Danielle Steel', rating: 9.0122, nationality: 'American'},
    {position: 5, name: 'Harold Robbins', rating: 10.811, nationality: 'American'},
    {position: 6, name: 'Georges Simenon', rating: 12.0107, nationality: 'Belgian'},
    {position: 7, name: 'Eiichiro Oda', rating: 14.0067, nationality: 'Japanese'},
    {position: 8, name: 'Gilbert Patten', rating: 15.9994, nationality: 'American'},
    {position: 9, name: 'Akira Toriyama', rating: 18.9984, nationality: 'Japanese'},
    {position: 10, name: 'Leo Tolstoy', rating: 20.1797, nationality: 'Russian'},
  ];


  constructor() { }

  ngOnInit(): void {
  }



}
