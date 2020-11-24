import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Paper, Avatar } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: "0 auto",
            marginTop: "150px",
            padding: "33px",
            width: "50%",
            minWidth: "333px",
            height: "auto",
        },
        pic: {
            width: "150px",
            height: "auto",
        }
    },
    media: {
        display: "inline-block",
        width: "150px",
        height: "150px",
        background: "url('https://cdn.staticneo.com/w/bleach/thumb/Masked_Ichigo.jpg/200px-Masked_Ichigo.jpg')",
        backgroundPosition: "50% 50%",
        backroundSize: "cover",
        borderRadius: "50%",
      }
}));

export default function UserSettings() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Paper>
                <div className={classes.media}></div>
                This is the user account setting box
            </Paper>

        </div>
    );
}

