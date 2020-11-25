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
        // <Link to="settings" style={{textDecoration: "none"}}>
        //   <RiUserSettingsLine style={{ float: "right", textDecoration: "none" }} />
        // </Link>
        <Button component={Link} to={"/settings"} style={{ float: "right" }}>
          <RiUserSettingsLine  />
        </Button>
      );
    }
  }

  console.log(state.selectedUser?.imageUrl)

  return (
    <div className={classes.root}>
      {userData ? (
        <>
          {editProfile()}
          { state.selectedUser.imageUrl ? <div className={classes.media} style={{ background: `url('${state.selectedUser.imageUrl}')` }}></div> 
                    :<div className={classes.media} style={{ background: "url('https://secure.gravatar.com/avatar/eb75ef0fcc9982ff515270a4c00ee18f?s=256&d=mm&r=g')" }}></div>}
          <Typography
            variant="h4"
            className={classes.handle}
          >{`@${userData.username}`}</Typography>
          <Link to={`/user/supported/${userData.id}`} >
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
  media: {
    display: "block",
    width: "150px",
    height: "150px",
    backgroundPosition: "center center",
    backroundSize: "cover",
    borderRadius: "50%",
    margin: "0 auto"
}
}));
