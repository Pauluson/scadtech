import { TestBed } from '@angular/core/testing';

import { ServiceItemService } from './service-item.service';

describe('ServiceItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceItemService = TestBed.get(ServiceItemService);
    expect(service).toBeTruthy();
  });
});
