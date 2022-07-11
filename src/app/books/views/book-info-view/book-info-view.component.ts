import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-info-view',
  templateUrl: './book-info-view.component.html',
  styleUrls: ['./book-info-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookInfoViewComponent implements OnInit {

  public id!: number;

  constructor(private readonly _activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  }

}
