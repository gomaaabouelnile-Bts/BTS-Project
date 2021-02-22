import { TestBed } from '@angular/core/testing';

import { SItemsService } from './sitems.service';

describe('SItemsService', () => {
  let service: SItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
