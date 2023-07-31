import {TestBed} from '@angular/core/testing';

import {ShowSeanceService} from './show-seance.service';

describe('ShowSeanceService', () => {
  let service: ShowSeanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSeanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
