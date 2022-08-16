import React from 'react';
import styles from './Bookmark.module.css';

import thunderstorm from '../../assets/thunderstorm.svg';

const Bookmark = () => {
    return (
        <div className={styles.bookmark}>
            <span className={styles.bookmark__cityName}>Москва</span>
            <span className={styles.bookmark__temp}>-13°</span>
            <img className={styles.bookmark__icon} src={thunderstorm} alt={'Погода'}/>
        </div>
    )
}

export default Bookmark;