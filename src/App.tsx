import React, { Fragment } from 'react';
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import WeatherBlock from "./components/WeatherBlock/WeatherBlock";


const App = () => {
    return (
        <Fragment>
                <Header/>
                <SearchBar/>
                <Bookmarks/>
                <WeatherBlock/>
        </Fragment>
    )
}

export default App;