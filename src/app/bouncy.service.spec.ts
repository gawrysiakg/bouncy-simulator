import { TestBed } from '@angular/core/testing';

import { BouncyService } from './bouncy.service';

describe('BouncyService', () => {
  let service: BouncyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouncyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
