import { TestBed } from '@angular/core/testing';

import { GlobalAPIURLService } from './global-apiurl.service';

describe('GlobalAPIURLService', () => {
  let service: GlobalAPIURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalAPIURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
