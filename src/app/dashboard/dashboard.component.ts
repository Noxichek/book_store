import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(value: string) {
    this.router.navigate([value])
  }
}
