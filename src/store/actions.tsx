import * as actions from './actionTypes';
export const showWeatherBlock = (data: any) => ({
    type: actions.SHOW_WEATHER_BLOCK,
    payload: data
});