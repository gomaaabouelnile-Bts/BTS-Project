import { TestBed } from '@angular/core/testing';

import { SunitService } from './sunit.service';

describe('SunitService', () => {
  let service: SunitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SunitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
