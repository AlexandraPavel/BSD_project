import { TestBed } from '@angular/core/testing';

import { InvestementService } from './investement.service';

describe('InvestementService', () => {
  let service: InvestementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
