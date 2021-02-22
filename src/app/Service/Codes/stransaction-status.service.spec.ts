import { TestBed } from '@angular/core/testing';

import { STransactionStatusService } from './stransaction-status.service';

describe('STransactionStatusService', () => {
  let service: STransactionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STransactionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
