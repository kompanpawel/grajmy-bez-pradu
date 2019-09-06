import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from "../Navigation";

import { MAIN_PAGE } from "constants/routes";
import MainPage from "components/MainPage";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Navigation/>
                <Route exact path={MAIN_PAGE.route} component={MainPage}/>
            </div>
        </Router>
    );
};

export default App;
