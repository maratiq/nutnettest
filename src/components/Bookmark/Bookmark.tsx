import React, {useEffect, useState} from 'react';
import styles from './Bookmark.module.css';

import thunderstorm from '../../assets/thunderstorm.svg';
import drizzle from "../../assets/drizzle.svg";
import rain from "../../assets/rain.svg";
import snow from "../../assets/snow.svg";
import mist from "../../assets/mist-smoke-haze-fog.svg";
import dust from "../../assets/dust_sand_ash.svg";
import squall from "../../assets/squall.svg";
import tornado from "../../assets/tornado.svg";
import clear from "../../assets/clear.svg";
import clouds from "../../assets/clouds.svg";

type BookmarkProps = {
    cityName?: string,
    temp?: string,
}

interface IWeatherData {
    name: string,
    temp: number,
    main: string
}

const weatherData: IWeatherData = {
    name: null,
    temp: null,
    main: null
}

function setWeatherData ({main, name, weather}: any) {
    weatherData.name = name;
    weatherData.temp = main.temp;
    weatherData.main = weather[0].main;
    console.log(weatherData)
    return true
}

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

const getWeather = async (cityName: string) => {
    await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=6852b987d7fb620280f800f5ddfbe188&lang=ru&units=metric')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then(data => {
            setWeatherData(data)
            return true
        })
        .catch(error => {
            console.log(error);
        })
}


const Bookmark = ({ cityName }: BookmarkProps) => {
    const [isWeatherDataReceived, setIsWeatherDataReceived] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWeather(cityName);
            setIsWeatherDataReceived(true);
        }
        fetchData().catch(console.error);
    })

    return (
        <div className={styles.bookmark}>
            <span className={styles.bookmark__cityName}>{ weatherData.name }</span>
            <span className={styles.bookmark__temp}>{ weatherData.temp }°</span>
            <img className={styles.bookmark__icon} src={getWeatherIcon(weatherData.main)} alt={'Погода'}/>
        </div>
    )
}

export default Bookmark;