import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInfoViewComponent } from './author-info-view.component';

describe('AuthorInfoViewComponent', () => {
  let component: AuthorInfoViewComponent;
  let fixture: ComponentFixture<AuthorInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorInfoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
