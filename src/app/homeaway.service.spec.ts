import { TestBed } from '@angular/core/testing';

import { HomeawayService } from './homeaway.service';

describe('HomeawayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeawayService = TestBed.get(HomeawayService);
    expect(service).toBeTruthy();
  });
});
