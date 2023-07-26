import { TestBed } from '@angular/core/testing';

import { BracketsService } from './brackets.service';

describe('BracketsService', () => {
  let service: BracketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BracketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
