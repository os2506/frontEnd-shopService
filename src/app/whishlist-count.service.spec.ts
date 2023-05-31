import { TestBed } from '@angular/core/testing';

import { WhishlistCountService } from './whishlist-count.service';

describe('WhishlistCountService', () => {
  let service: WhishlistCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhishlistCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
