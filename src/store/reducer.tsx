import * as actions from './actionTypes';

const initialState = {
    isShowWeatherBlock: false
}

export default function reducer(state:any = initialState, action:any) {
    switch (action.type) {
        case actions.SHOW_WEATHER_BLOCK:
            return {...state, isShowWeatherBlock: action.payload};
        default:
            return state;
    }
}