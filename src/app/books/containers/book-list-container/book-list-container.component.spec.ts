import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListContainerComponent } from './book-list-container.component';

describe('BookListContainerComponent', () => {
  let component: BookListContainerComponent;
  let fixture: ComponentFixture<BookListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
