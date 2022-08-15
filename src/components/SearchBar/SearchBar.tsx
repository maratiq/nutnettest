import React, {useState} from 'react';
import styles from './SearchBar.module.css';


import Arrow from '../../assets/arrow.svg';
import {showWeatherBlock} from "../../store/actions";
import {useAppDispatch} from "../../hooks";

const SearchBar = () => {
    const [inputLocation, setInputLocation] = useState('');
    const dispatch = useAppDispatch();

    const onCityClick = (e: any) => {
        setInputLocation(e.target.textContent);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputLocation + '&appid=6852b987d7fb620280f800f5ddfbe188&lang=ru')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch(showWeatherBlock(true))
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