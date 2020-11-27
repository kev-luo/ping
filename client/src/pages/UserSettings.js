import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { FiImage } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import UserSettingsModal from "../components/User/UserSettingsModal";

export default function UserSettings() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [userSettings, setUserSettings] = useState("");

  function handleClick(e) {
    setIsOpen(!isOpen);
    setUserSettings(e.target.textContent);
  }

  return (
    <div className={classes.root}>
      <Paper>
        <div
          className={classes.media}
          style={{
            background:
              "url('https://cdn.staticneo.com/w/bleach/thumb/Masked_Ichigo.jpg/200px-Masked_Ichigo.jpg')",
          }}
        ></div>

        <Button endIcon={<FiImage />} onClick={handleClick}>
          Update Profile Picture
        </Button>
        <Button endIcon={<MdDelete />} onClick={handleClick}>
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