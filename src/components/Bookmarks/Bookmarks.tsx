import React, {useEffect, useState} from 'react';
import styles from './Bookmarks.module.css';

import BookmarkIcon from '../../assets/bookmark.svg';
import Bookmark from "../Bookmark/Bookmark";

const Bookmarks = () => {
    const [isBookmarkExists, setIsBookmarkExists] = useState(false);
    const [citiesArr, setCitiesArr] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('cities') && localStorage.getItem('cities').length !== 0) {
            setIsBookmarkExists(true)
            setCitiesArr(localStorage.getItem('cities'))
        }
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
                    <Bookmark/>
                </div>
        )
    }

}

export default Bookmarks;