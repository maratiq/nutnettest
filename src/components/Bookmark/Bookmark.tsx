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
import {useAppDispatch} from "../../hooks";
import {getWeatherInfo, showWeatherBlock} from "../../store/actions";

type BookmarkProps = {
    cityName?: string,
    temp?: string,
}

interface IWeatherData {
    name: string,
    description: string,
    temp: number,
    pressure: number,
    sunset: string,
    main: string
}

const weatherData: IWeatherData = {
    name: null,
    description: null,
    temp: null,
    pressure: null,
    sunset: null,
    main: null
};

function setWeatherData ({main, name, sys, weather}: any) {
    weatherData.name = name;
    weatherData.description = weather[0].description;
    weatherData.temp = main.temp;
    weatherData.pressure = main.pressure;
    let date = new Date(sys.sunset * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    weatherData.sunset = hours + ':' + minutes.substr(-2);
    weatherData.main = weather[0].main;
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
    await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=ac25327913087d4147aca161c770e022&lang=ru&units=metric')
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
    const [name, setName] = useState(null);
    const [temp, setTemp] = useState(null);
    const [main, setMain] = useState(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await getWeather(cityName);
            setName(weatherData.name)
            setTemp(weatherData.temp)
            setMain(weatherData.main)
        }
        fetchData().catch(console.error);
    }, [])

    const clickHandler = async () => {
        await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=ac25327913087d4147aca161c770e022&lang=ru&units=metric')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then(data => {
                setWeatherData(data)
                dispatch(getWeatherInfo(weatherData));
                dispatch(showWeatherBlock(true));
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={styles.bookmark} onClick={clickHandler}>
            <span className={styles.bookmark__cityName}>{ name }</span>
            <span className={styles.bookmark__temp}>{ temp }°</span>
            <img className={styles.bookmark__icon} src={getWeatherIcon(main)} alt={'Погода'}/>
        </div>
    )
}

export default Bookmark;