import React, {Fragment} from 'react';
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import BookmarkInfo from "./components/BookmarkInfo/BookmarkInfo";

const App = () => {
    return (
        <Fragment>
            <Header/>
            <SearchBar/>
            <BookmarkInfo/>
        </Fragment>
    )
}

export default App;