import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoContainerComponent } from './book-info-container.component';

describe('BookInfoContainerComponent', () => {
  let component: BookInfoContainerComponent;
  let fixture: ComponentFixture<BookInfoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInfoContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
