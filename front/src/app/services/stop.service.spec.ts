import { TestBed } from '@angular/core/testing';

import { StopService } from './stop.service';
import { HttpClientModule } from '@angular/common/http';

describe('StopService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: StopService = TestBed.get(StopService);
    expect(service).toBeTruthy();
  });
});
