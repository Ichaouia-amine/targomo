import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StopEffects } from './stop.effects';
import { HttpClientModule } from '@angular/common/http';

describe('StopEffects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: StopEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        StopEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<StopEffects>(StopEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
