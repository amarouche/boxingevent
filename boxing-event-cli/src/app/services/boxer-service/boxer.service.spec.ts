import { TestBed } from '@angular/core/testing';

import { BoxerService } from './boxer.service';

describe('BoxerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoxerService = TestBed.get(BoxerService);
    expect(service).toBeTruthy();
  });
});
