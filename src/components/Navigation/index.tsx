import React from 'react';
import {Link} from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const Navigation: React.FC<any> = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
            </ul>
        </div>
    )
};

export default Navigation;