import React from 'react';
import styles from './Header.module.css'

import Logo2 from '../../assets/logo-min.svg';
import {showWeatherBlock} from "../../store/actions";
import {useAppDispatch} from "../../hooks";

const Header = () => {
    const dispatch = useAppDispatch();

    const handleOnClick = () => {
        dispatch(showWeatherBlock(false));
    }

    return (
        <header className={styles.header}>
            <img src={Logo2} alt={'Лого'} onClick={handleOnClick}/>
        </header>
    )
}

export default Header;