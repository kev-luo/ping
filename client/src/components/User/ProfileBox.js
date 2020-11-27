import React, { useState, useEffect } from "react";
import { Typography, Avatar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import Loading from "../Loading";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function ProfileBox({ userData }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const feedType = pathname.split("/");

  const [highlightFeed, setHighlightFeed] = useState(feedType[2]);
  const { user } = useAuthContext();
  const [state] = useDashboardContext();

  useEffect(() => {
    setHighlightFeed(feedType[2]);
  }, [feedType]);

  function editProfile() {
    if (user.id === state.selectedUser.id) {
      return (
        <Link to="/settings">
          <RiUserSettingsLine style={{ float: "right"}}/>
        </Link>
      );
    }
  }

  function seeNewPings() {
    if (user.id === state.selectedUser.id) {
      return (
        <Link
          to={`/user/${userData.id}`}
          className={
            highlightFeed !== "supported" &&
            highlightFeed !== "pinged" &&
            feedType[1] === "user"
              ? classes.activeFeedButton
              : ""
          }
        >
          <button>New Pings</button>
        </Link>
      );
    }
  }

  const userProfile = userData?.imageUrl ? (
    <Avatar
      src={userData.imageUrl}
      alt={userData.username}
      className={classes.profilePic}
    />
  ) : (
    <Avatar className={classes.missingPic}>
      <FaUser />
    </Avatar>
  );

  return (
    <div>
      {userData ? (
        <>
          {editProfile()}
          <Grid container justify="center">
            <Grid item xs={12}>
              <Typography
                variant="h4"
                className={classes.handle}
              >{`@${userData.username}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              {userProfile}
            </Grid>
            <Grid item className={classes.feedButtons}>
              <Link
                to={`/user/supported/${userData.id}`}
                className={
                  highlightFeed === "supported" ? classes.activeFeedButton : ""
                }
              >
                <button>Supported Pings</button>
              </Link>
              <Link
                to={`/user/pinged/${userData.id}`}
                className={
                  highlightFeed === "pinged" ? classes.activeFeedButton : ""
                }
              >
                <button>Posted Pings</button>
              </Link>
              {seeNewPings()}
            </Grid>
          </Grid>
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
    marginBottom: "0.6rem",
  },
  missingPic: {
    width: "6rem",
    height: "6rem",
    "& > *": {
      width: "4rem",
      height: "4rem",
    },
    margin: "0 auto",
  },
  profilePic: {
    width: "6rem",
    height: "6rem",
    margin: "0 auto",
  },
  feedButtons: {
    marginTop: "1rem",
    "& button": {
      textDecoration: "none",
      backgroundColor: "transparent",
      border: "none",
      fontSize: "17px",
      "&:focus": {
        outline: 0,
      },
      "&:hover": {
        cursor: "pointer",
        color: "#DC143C",
      },
    },
  },
  activeFeedButton: {
    borderBottom: "2px solid red",
    "& > *": {
      color: "#DC143C",
    },
  }
}));
