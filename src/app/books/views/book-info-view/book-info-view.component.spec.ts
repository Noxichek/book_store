import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoViewComponent } from './book-info-view.component';

describe('BookInfoViewComponent', () => {
  let component: BookInfoViewComponent;
  let fixture: ComponentFixture<BookInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInfoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
