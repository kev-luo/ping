import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RiUserSettingsLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import Loading from "../Loading";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function ProfileBox({ userData }) {
  const classes = useStyles();
  const { user } = useAuthContext();
  const [state] = useDashboardContext();

  function editProfile() {
    if (user.id === state.selectedUser.id) {
      return (
        <Link to="settings">
          <RiUserSettingsLine style={{ float: "right" }} />
        </Link>
      );
    }
  }

  return (
    <div className={classes.root}>
      {userData ? (
        <>
          {editProfile()}
          <Typography
            variant="h4"
            className={classes.handle}
          >{`@${userData.username}`}</Typography>
          <Link to={`/user/supported/${userData.id}`}>
            <Button>Supported Pings</Button>
          </Link>
          <Link to={`/user/pinged/${userData.id}`}>
            <Button>Posted Pings</Button>
          </Link>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

const useStyles = makeStyles((themes) => ({
  handle: {
    textAlign: "center",
  },
  root: {
    "& > *": {
      textDecoration: "none",
    },
  },
}));
