import { TestBed } from '@angular/core/testing';

import { AuthorFetchService } from './author-fetch.service';

describe('AuthorFetchService', () => {
  let service: AuthorFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
