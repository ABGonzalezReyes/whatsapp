import { TestBed } from '@angular/core/testing';

import { RelationShipService } from './relation-ship.service';

describe('RelationShipService', () => {
  let service: RelationShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationShipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
