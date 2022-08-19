import React, {useEffect, useState} from 'react';
import styles from './Bookmarks.module.css';

import BookmarkIcon from '../../assets/bookmark.svg';
import Bookmark from "../Bookmark/Bookmark";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {updateIsBookmarkExists} from "../../store/actions";


const Bookmarks = () => {
    const [isBookmarkExists, setIsBookmarkExists] = useState(false);
    const isShowWeatherBlock = useAppSelector((state) => state.isShowWeatherBlock)
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (localStorage.getItem('cities') && JSON.parse(localStorage.getItem('cities')).length !== 0) {
            setIsBookmarkExists(true)
            dispatch(updateIsBookmarkExists(true))
        } else {
            setIsBookmarkExists(false)
            dispatch(updateIsBookmarkExists(false))
        }
    })

    const bookmarks = localStorage.getItem('cities') && JSON.parse(localStorage.getItem('cities')).map((city: string) => {
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