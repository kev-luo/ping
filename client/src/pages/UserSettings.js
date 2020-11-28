import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Avatar } from "@material-ui/core";
import { FiImage } from "react-icons/fi";
import { FaUser } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { FETCH_USER_QUERY } from '../utils/graphql';
import { useDashboardContext } from '../utils/useDashboardContext';
import UserSettingsModal from "../components/User/U_Settings/UserSettingsModal";

export default function UserSettings() {
  const classes = useStyles();
  const history = useHistory();
  const [state] = useDashboardContext();
  const [isOpen, setIsOpen] = useState(false);
  const [userSettings, setUserSettings] = useState("");

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: state.selectedUser?.id }
  })

  function handleClick(e) {
    setIsOpen(!isOpen);
    setUserSettings(e.target.textContent);
  }

  const userProfile = data?.getUser ? (
    <Avatar src={data.getUser.imageUrl} alt={data.getUser.username} className={classes.media} />
  ) : (
    <Avatar className={classes.missingPic}>
      <FaUser />
    </Avatar>
  )

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Button color="primary" variant="contained" onClick={() => history.goBack()}>
          Go Back
        </Button>
        {userProfile}
        <Button color="secondary" endIcon={<FiImage />} onClick={handleClick}>
          Update Profile Picture
        </Button>
        <Button color="secondary" endIcon={<MdDelete />} onClick={handleClick}>
          Delete Profile
        </Button>
      </Paper>
      <UserSettingsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userSettings={userSettings}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "0 auto",
      marginTop: "150px",
      padding: "33px",
      width: "50%",
      minWidth: "333px",
      height: "auto",
    },
    textAlign: "center",
  },
  paper: {
    backgroundColor: theme.palette.primary.main
  },
  media: {
    display: "block",
    width: "150px",
    height: "150px",
    backgroundPosition: "50% 50%",
    backroundSize: "cover",
    borderRadius: "50%",
    margin: "0 auto",
  },
}));
