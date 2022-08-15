import React, {useState} from 'react';
import styles from './WeatherBlock.module.css'

import arrowLeft from '../../assets/chevron_big_left.svg';
import bookmarkIcon from "../../assets/bookmark.svg";
import thunderstorm from '../../assets/thunderstorm.svg';
import barometer from '../../assets/barometer.svg';

const WeatherBlock = () => {
    const [showComponent, setShowComponent] = useState(false);
    if (showComponent) {
        return (
            <div className={styles.weatherBlock}>
                <button className={styles.weatherBlock__buttonBack}>
                    <img src={arrowLeft} alt={'Стрелка влево'}/>
                    Назад
                </button>
                <img className={styles.weatherBlock__bookmark} alt={'Закладка'} src={bookmarkIcon}/>
                <div className={styles.weatherBlock__info}>
                    <h1 className={styles.weatherBlock__cityName}>Москва</h1>
                    <span className={styles.weatherBlock__condition}>Облачно с прояснениями</span>
                    <div className={styles.weatherBlock__temperatureConditionWrapper}>
                        <span className={styles.weatherBlock__temperatureValue}>-13°</span>
                        <img className={styles.weatherBlock__conditionIcon} src={thunderstorm} alt={'Погода'}/>
                    </div>
                    <div className={styles.weatherBlock__pressure}>
                        <img src={barometer} alt={'Барометр'}/>
                        <span className={styles.weatherBlock__pressureValue}>756 мм рт. ст.</span>
                    </div>
                    <span className={styles.weatherBlock__sunset}>
                    Закат в 18:00
                </span>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default WeatherBlock;