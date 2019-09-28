import { Stop } from '../model/stop';
import { StopActions, StopActionTypes } from '../actions/stop.actions';

const intialState: Array<Stop> = [
    /*{
        prevStopId : '',
        peopleOn: 6,
        lng : 2.302136,
        stopId : 'stop_id',
        name : 'name',
        peopleOff : 0,
        geom : null,
        reachPop30Walk : 1,
        lat : 5.637377,
        reachPop30Bike : 5
    }*/
];
export function StopReducer(state: Array<Stop> = intialState, action: StopActions) {
    switch (action.type) {
        case StopActionTypes.LoadStops:
            return [...state, action.payload];
        default:
            return state;
    }
}
