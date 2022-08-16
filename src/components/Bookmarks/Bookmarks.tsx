import React from 'react';
import styles from './Bookmarks.module.css';

import BookmarkIcon from '../../assets/bookmark.svg';


const Bookmarks = () => {
    return (
        <div className={styles.bookmarkInfo}>
            <span className={styles.bookmarkInfo__text}>
                Используйте значок «закладки»,
                чтобы закрепить город на главной
            </span>
            <img src={BookmarkIcon} alt={'Закладка'}/>
        </div>
    )
}

export default Bookmarks;