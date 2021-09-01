import { TestBed } from '@angular/core/testing';

import { ServiceInventarioService } from './service-inventario.service';

describe('ServiceInventarioService', () => {
  let service: ServiceInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
