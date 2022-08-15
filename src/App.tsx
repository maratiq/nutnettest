import React, {Fragment} from 'react';
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
    return (
        <Fragment>
            <Header/>
            <SearchBar/>
        </Fragment>
    )
}

export default App;