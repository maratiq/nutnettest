import * as actions from './actionTypes';
export const showWeatherBlock = (data: any) => ({
    type: actions.SHOW_WEATHER_BLOCK,
    payload: data
});

export const getWeatherInfo = (data: any) => ({
    type: actions.GET_WEATHER_INFO,
    payload: data
});