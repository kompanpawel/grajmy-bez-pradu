import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from "../Navigation";

import * as ROUTES from "../../constants/routes";
import LandingPage from "../Landing";

class App extends React.PureComponent {

    render() {
        return (
            <Router>
                <div>
                    <Navigation/>

                    <hr/>

                    <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                </div>
            </Router>
        );
    }

}

export default App;
