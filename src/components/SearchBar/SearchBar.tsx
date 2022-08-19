import React, {useEffect, useState} from 'react';
import styles from './SearchBar.module.css';
import classNames from 'classnames'


import Arrow from '../../assets/arrow.svg';
import {getWeatherInfo, showWeatherBlock} from "../../store/actions";
import {useAppDispatch, useAppSelector} from "../../hooks";
import useDebounce from "../../debounce";


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
    const [results, setResults] = useState([]);

    const debouncedSearchTerm = useDebounce(inputLocation, 500);

    const dispatch = useAppDispatch();
    const isBookmarkExists = useAppSelector((state) => state.isBookmarkExists)

    const onCityClick = (e: any) => {
        setInputLocation(e.target.textContent);
    }

    const findWeather = async (location?: string) => {
        const currentLocation = location ? location : inputLocation
        await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + currentLocation + '&appid=ac25327913087d4147aca161c770e022&lang=ru&units=metric')
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await findWeather();
    }

    function searchCharacters(search: any) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c7782327c7msh9dfdd625cb31285p1a89b9jsnfca95aec0b0b',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
            return fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&minPopulation=1000000&namePrefix='+ search +'&sort=-countryCode&languageCode=ru', options)
                .then(response => response.json())
                .then(data => {
                    if (data.data.length !== 0) {
                        return data.data[0].city
                    } else {
                        return null;
                    }
                })
                .catch(err => console.error(err));
    }

    useEffect(() => {
        if (debouncedSearchTerm && debouncedSearchTerm.length >= 3) {
            searchCharacters(debouncedSearchTerm).then((data: any) => {
                if (typeof data === "string") setResults([data]);
            });
        } else {
            setResults([]);
        }
    }, [debouncedSearchTerm])



    const handleOnChange = (cityData: any) => {
        setInputLocation(cityData);
    }

    const handleOnClick = async () => {
        setInputLocation(results[0])
        await findWeather(results[0]);
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
            <div className={styles.searchBar__autocomplete}>
                <input type={"text"}
                       className={styles.searchBar__input}
                       placeholder={'Укажите город'}
                       id={'searchBar'}
                       onChange={(e: any) => handleOnChange(e.target.value)}
                       value={inputLocation}
                />
                {
                    results.length !== 0 && results.map((item) => {
                        return <div key={item} className={styles.searchBar__autocompleteItem} onClick={handleOnClick}>
                                    {item}
                            </div>

                    })

                }

            </div>


            { !isBookmarkExists &&
                inputLabel
            }
        </form>
    )
}

export default SearchBar;