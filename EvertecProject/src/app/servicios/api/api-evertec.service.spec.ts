import { TestBed } from '@angular/core/testing';

import { ApiEvertecService } from './api-evertec.service';

describe('ApiEvertecService', () => {
  let service: ApiEvertecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEvertecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
