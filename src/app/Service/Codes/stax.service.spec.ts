import { TestBed } from '@angular/core/testing';

import { STaxService } from './stax.service';

describe('STaxService', () => {
  let service: STaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
