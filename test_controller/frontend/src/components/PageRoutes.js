import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import MainPage from './MainPage';
import Home from './Home';

function PageRoutes() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/type/:scoresID' element={<MainPage/>}></Route>
                    <Route exact path='/type/home/:scoresID' element={<Home/>}></Route>
                </Routes>
            </Router>
        )
}

export default PageRoutes;