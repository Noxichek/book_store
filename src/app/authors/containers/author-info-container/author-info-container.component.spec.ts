import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInfoContainerComponent } from './author-info-container.component';

describe('AuthorInfoContainerComponent', () => {
  let component: AuthorInfoContainerComponent;
  let fixture: ComponentFixture<AuthorInfoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorInfoContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
