import React, { useState } from "react";
import Filters from "components/Filters";
import SearchedSessions from "components/SearchedSessions";
import { withFirebase } from "components/Firebase";
import { Button, Drawer } from "@material-ui/core";

const SearchSessionPage: React.FC<any> = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const onClickHandler = () => {
    setOpenDrawer(true);
  };

  const closeDrawerHandler = () => {
    setOpenDrawer(false)
  };

  return (
    <div>
      <div>
        <Button type="submit" color="primary" variant="contained" onClick={onClickHandler}>
          Ustaw filtry
        </Button>
      </div>
      <div>
        <div>
          <WrappedSearchedSessions />
        </div>
      </div>
      <Drawer className="navigation-drawer" variant="persistent" anchor="top" open={openDrawer}>
        <Filters closeDrawer={closeDrawerHandler}/>
      </Drawer>
    </div>
  );
};

const WrappedSearchedSessions = withFirebase(SearchedSessions);

export default React.memo(SearchSessionPage);
