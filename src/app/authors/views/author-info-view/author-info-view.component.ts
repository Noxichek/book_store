import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-info-view',
  templateUrl: './author-info-view.component.html',
  styleUrls: ['./author-info-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorInfoViewComponent implements OnInit {

  public id!: number;

  constructor(private readonly _activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  }

}
