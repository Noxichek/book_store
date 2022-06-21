import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsContainerComponent } from './authors-container.component';

describe('AuthorsContainerComponent', () => {
  let component: AuthorsContainerComponent;
  let fixture: ComponentFixture<AuthorsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
