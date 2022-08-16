import React from 'react';
import styles from './WeatherBlock.module.css';

import arrowLeft from '../../assets/chevron_big_left.svg';
import bookmarkIcon from "../../assets/bookmark.svg";
import thunderstorm from '../../assets/thunderstorm.svg';
import drizzle from '../../assets/drizzle.svg';
import rain from '../../assets/rain.svg';
import snow from '../../assets/snow.svg';
import mist from '../../assets/mist-smoke-haze-fog.svg';
import squall from '../../assets/squall.svg';
import clear from '../../assets/clear.svg';
import clouds from '../../assets/clouds.svg';
import tornado from '../../assets/tornado.svg';
import dust from '../../assets/dust_sand_ash.svg';
import barometer from '../../assets/barometer.svg';
import {showWeatherBlock} from "../../store/actions";
import {useAppDispatch, useAppSelector} from "../../hooks";

function getWeatherIcon (weather: string) {
    switch (weather) {
        case 'Thunderstorm':
            return thunderstorm;
        case 'Drizzle':
            return drizzle
        case 'Rain':
            return rain
        case 'Snow':
            return snow
        case 'Mist':
            return mist
        case 'Smoke':
            return mist
        case 'Haze':
            return mist
        case 'Dust':
            return dust
        case 'Fog':
            return mist
        case 'Sand':
            return dust
        case 'Ash':
            return dust
        case 'Squall':
            return squall
        case 'Tornado':
            return tornado
        case 'Clear':
            return clear
        case 'Clouds':
            return clouds
    }
}

const WeatherBlock = () => {
    const isShowWeatherBlock = useAppSelector((state) => state.isShowWeatherBlock)
    const weatherData = useAppSelector((state) => state.weatherData)
    const dispatch = useAppDispatch();

    if (isShowWeatherBlock) {
        return (
            <div className={styles.weatherBlock}>
                <button className={styles.weatherBlock__buttonBack} onClick={() => {
                    dispatch(showWeatherBlock(false));
                }}>
                    <img src={arrowLeft} alt={'Стрелка влево'} />
                    Назад
                </button>
                <img className={styles.weatherBlock__bookmark} alt={'Закладка'} src={bookmarkIcon}/>
                <div className={styles.weatherBlock__info}>
                    <h1 className={styles.weatherBlock__cityName}>{weatherData.name}</h1>
                    <span className={styles.weatherBlock__condition}>{weatherData.description}</span>
                    <div className={styles.weatherBlock__temperatureConditionWrapper}>
                        <span className={styles.weatherBlock__temperatureValue}>{weatherData.temp}°</span>
                        <img className={styles.weatherBlock__conditionIcon} src={getWeatherIcon(weatherData.main)} alt={'Погода'}/>
                    </div>
                    <div className={styles.weatherBlock__pressure}>
                        <img src={barometer} alt={'Барометр'}/>
                        <span className={styles.weatherBlock__pressureValue}>{weatherData.pressure} мм рт. ст.</span>
                    </div>
                    <span className={styles.weatherBlock__sunset}>
                    Закат в {weatherData.sunset}
                </span>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default WeatherBlock;