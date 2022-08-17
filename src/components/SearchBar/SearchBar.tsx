import React, {useState} from 'react';
import styles from './SearchBar.module.css';
import classNames from 'classnames'


import Arrow from '../../assets/arrow.svg';
import {getWeatherInfo, showWeatherBlock} from "../../store/actions";
import {useAppDispatch, useAppSelector} from "../../hooks";

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

const SearchBar = () => {
    const [inputLocation, setInputLocation] = useState('');
    const dispatch = useAppDispatch();
    const isBookmarkExists = useAppSelector((state) => state.isBookmarkExists)
    console.log(isBookmarkExists)

    const onCityClick = (e: any) => {
        setInputLocation(e.target.textContent);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputLocation + '&appid=ac25327913087d4147aca161c770e022&lang=ru&units=metric')
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

    const inputLabel =
        <label className={styles.searchBar__label} htmlFor={'searchBar'}>
            <img className={styles.searchBar__arrow} src={Arrow} alt={'Стрелка'}/>
            <div className={styles.searchBar__labelText}>
                <span>
                    Начните вводить город, например, &nbsp;
                </span>
                <span className={styles.searchBar__clickableCity} onClick={onCityClick}>
                    Ижевск
                </span>
            </div>
        </label>

    const formClassNames = classNames(styles.searchBar, (isBookmarkExists && styles.searchBar__marginless))

    return (
        <form className={formClassNames} onSubmit={handleSubmit}>
            <input type={"text"}
                   className={styles.searchBar__input}
                   placeholder={'Укажите город'}
                   id={'searchBar'}
                   onChange={(e: any) => setInputLocation(e.target.value)}
                   value={inputLocation}
            />
            { !isBookmarkExists &&
                inputLabel
            }
        </form>
    )
}

export default SearchBar;