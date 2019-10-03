import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import "./Navigation.scss";

import { routesArray } from "constants/routes";

const Navigation: React.FC<any> = () => {
  return (
    <div className="header__navigation">
      {_.map(routesArray, (route: any) => (
        <Link to={route.route} className="header__item">
          {route.pageName}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
