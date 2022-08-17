import React, {useEffect, useState} from 'react';
import styles from './Bookmarks.module.css';

import BookmarkIcon from '../../assets/bookmark.svg';
import Bookmark from "../Bookmark/Bookmark";
import {useAppSelector} from "../../hooks";


const Bookmarks = () => {
    const [isBookmarkExists, setIsBookmarkExists] = useState(false);
    const isShowWeatherBlock = useAppSelector((state) => state.isShowWeatherBlock)


    useEffect(() => {
        if (localStorage.getItem('cities') && JSON.parse(localStorage.getItem('cities')).length !== 0) {
            setIsBookmarkExists(true)
        } else {
            setIsBookmarkExists(false)
        }
    })

    const bookmarks = JSON.parse(localStorage.getItem('cities')).map((city: string) => {
        return <Bookmark key={city} cityName={city}/>
    })


    if (isBookmarkExists === false) {
        return (
            <div className={styles.bookmarkInfo}>
            <span className={styles.bookmarkInfo__text}>
                Используйте значок «закладки»,
                чтобы закрепить город на главной
            </span>
                <img src={BookmarkIcon} alt={'Закладка'}/>
            </div>
        )
    } else if (isBookmarkExists === true) {
        return (
                <div className={styles.bookmarkWrapper}>
                    {
                        bookmarks
                    }
                </div>
        )
    }

}

export default Bookmarks;