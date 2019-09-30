import { Stop } from './models';
import { StopState } from '../reducers/stop.reducer';

export interface AppState {
    readonly Stations: StopState;
}
