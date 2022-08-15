import React, { Fragment } from 'react';
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import BookmarkInfo from "./components/BookmarkInfo/BookmarkInfo";
import WeatherBlock from "./components/WeatherBlock/WeatherBlock";


const App = () => {
    return (
        <Fragment>
                <Header/>
                <SearchBar/>
                <BookmarkInfo/>
                <WeatherBlock/>
        </Fragment>
    )
}

export default App;