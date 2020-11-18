import React from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { Grid, Paper, Avatar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaComments } from "react-icons/fa";
import { FiImage } from "react-icons/fi";

import NewPing from './NewPing';
import SupportPing from './SupportPing';
import DeleteButton from './DeleteButton';
import { useAuthContext } from '../utils/useAuthContext';
import { FETCH_PINGS_QUERY } from "../utils/graphql";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(0, 2),
    paddingRight: 0,
  },
  pic: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  date: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
}));

function openPing(id) {
  console.log(id);
}

export default function Feed() {
  const classes = useStyles();
  const context = useAuthContext();
  const { loading, data } = useQuery(FETCH_PINGS_QUERY);

  return (
    <>
      {context.user && (
        <NewPing />
      )}
      {loading ||
        (data.getPings &&
          data.getPings.map((ping) => {
            return (
              <Paper key={ping.id} className={classes.paper} onClick={()=> openPing(ping.id)}>
                <Grid container wrap="nowrap" spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar className={classes.pic}>Pic</Avatar>
                  </Grid>
                  <Grid item>
                    <FiImage size={32} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle2">
                      {ping.user}
                      <span className={classes.date}>
                        {" "}
                        {moment(ping.createdAt).fromNow()}
                      </span>
                    </Typography>
                    <Typography variant="body2">{ping.body}</Typography>
                  </Grid>
                  <Grid item xs={2} container>
                    <Grid item>
                      <SupportPing user={context.user} ping={ping}/>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <FaComments style={{ color: "blue" }} size={15} />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <DeleteButton />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          }))}
    </>
  );
}
