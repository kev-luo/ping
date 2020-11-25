import React from "react";
import { Typography, Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaUser } from 'react-icons/fa';
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
        <Link to="/settings">
          <RiUserSettingsLine style={{ float: "right" }} />
        </Link>
      );
    }
  }

  function seeNewPings() {
    if (user.id === state.selectedUser.id) {
      return (
        <Link to={`/user/${userData.id}`}>
          <Button>New Pings</Button>
        </Link>
      );
    }
  }
  
  const userProfile = userData?.imageUrl ? (
    <Avatar src={userData.imageUrl} alt={userData.username} className={classes.profilePic} />
  ) : (
    <Avatar className={classes.missingPic}>
      <FaUser />
    </Avatar>
  )

  return (
    <div className={classes.root}>
      {userData ? (
        <>
          {editProfile()}
          <Typography
            variant="h4"
            className={classes.handle}
          >{`@${userData.username}`}</Typography>
          {userProfile}
          <Link to={`/user/supported/${userData.id}`}>
            <Button>Supported Pings</Button>
          </Link>
          <Link to={`/user/pinged/${userData.id}`}>
            <Button>Posted Pings</Button>
          </Link>
          {seeNewPings()}
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
  missingPic: {
    width: '6rem',
    height: '6rem',
    '& > *': {
      width: '4rem',
      height: '4rem',
    }
  },
  profilePic: {
    width: '6rem',
    height: '6rem',
  }
}));
