import { TestBed } from '@angular/core/testing';

import { PageTitlesService } from './page-titles.service';

describe('PageTitlesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageTitlesService = TestBed.get(PageTitlesService);
    expect(service).toBeTruthy();
  });
});
