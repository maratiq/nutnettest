import React from 'react';
import styles from './Header.module.css'

import Logo from '../../assets/logo1.svg';

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={Logo} alt={'Лого'} className={styles.logo}/>
            <span className={styles.title}>WeatherCheck</span>
        </header>
    )
}

export default Header;