import { TestBed } from '@angular/core/testing';

import { ShoppingCartRestService } from './shopping-cart-rest.service';

describe('ShoppingCartRestService', () => {
  let service: ShoppingCartRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
