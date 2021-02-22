import { TestBed } from '@angular/core/testing';

import { STaxSubTypesService } from './stax-sub-types.service';

describe('STaxSubTypesService', () => {
  let service: STaxSubTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STaxSubTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
