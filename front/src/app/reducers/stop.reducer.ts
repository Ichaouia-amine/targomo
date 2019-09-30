import { Stop } from '../model/stop';
import { StopActions, StopActionTypes } from '../actions/stop.actions';

export interface StopState {
    stops: Array<Stop>;
    error: Error;
    loading: boolean;
}
const intialState: StopState = {
    stops: [],
    loading: false,
    error: undefined
};
export function StopReducer(state: StopState = intialState, action: StopActions) {
    switch (action.type) {

        case StopActionTypes.LoadStops:
            return { ...state, loading: true };
        case StopActionTypes.LoadStopsSuccess:
            return { ...state, loading: false, stops: action.payload };
        case StopActionTypes.LoadStopsFailure:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
