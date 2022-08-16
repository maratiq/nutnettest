import React, {useState} from 'react';
import styles from './SearchBar.module.css';


import Arrow from '../../assets/arrow.svg';
import {getWeatherInfo, showWeatherBlock} from "../../store/actions";
import {useAppDispatch} from "../../hooks";

interface IWeatherData {
    name: string,
    description: string,
    temp: number,
    pressure: number,
    sunset: string
}

const weatherData: IWeatherData = {
    name: null,
    description: null,
    temp: null,
    pressure: null,
    sunset: null
};

const SearchBar = () => {
    const [inputLocation, setInputLocation] = useState('');
    const dispatch = useAppDispatch();

    const onCityClick = (e: any) => {
        setInputLocation(e.target.textContent);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputLocation + '&appid=6852b987d7fb620280f800f5ddfbe188&lang=ru&units=metric')
            .then(response => response.json())
            .then(data => {
                dispatch(showWeatherBlock(true))
                weatherData.name = data.name;
                weatherData.description = data.weather[0].description;
                weatherData.temp = data.main.temp;
                weatherData.pressure = data.main.pressure;
                let date = new Date(data.sys.sunset * 1000);
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                weatherData.sunset = hours + ':' + minutes.substr(-2);
                dispatch(getWeatherInfo(weatherData))
            })
            .catch(error => console.log(error))
    }

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input type={"text"}
                   className={styles.searchBar__input}
                   placeholder={'Укажите город'}
                   id={'searchBar'}
                   onChange={(e: any) => setInputLocation(e.target.value)}
                   value={inputLocation}
            />
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
        </form>
    )
}

export default SearchBar;