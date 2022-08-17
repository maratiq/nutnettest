import * as actions from './actionTypes';

const initialState = {
    isShowWeatherBlock: false,
    weatherData: {},
    isBookmarkExists: {},
}

export default function reducer(state:any = initialState, action:any) {
    switch (action.type) {
        case actions.SHOW_WEATHER_BLOCK:
            return {...state, isShowWeatherBlock: action.payload};
        case actions.GET_WEATHER_INFO:
            return {...state, weatherData: action.payload}
        case actions.UPDATE_IS_BOOKMARK_EXISTS:
            return {...state, isBookmarkExists: action.payload}
        default:
            return state;
    }
}