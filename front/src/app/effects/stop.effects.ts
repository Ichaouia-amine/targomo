import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { StopActions, StopActionTypes, LoadStopsSuccess, LoadStopsFailure } from '../actions/stop.actions';
import { StopService } from '../services/stop.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class StopEffects {


  @Effect() loadStops$ = this.actions$.pipe(
    ofType<StopActions>(StopActionTypes.LoadStops),
    mergeMap(
      () => this.stopsService.getStops()
        .pipe(
          map(data => new LoadStopsSuccess(data)),
          catchError(error => of(new LoadStopsFailure(error)))
        )
    )
  );
  constructor(private actions$: Actions, private stopsService: StopService) { }

}
