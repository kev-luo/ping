import React from "react";
import moment from "moment";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useQuery } from "@apollo/client";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';

import { useDashboardContext } from "../../utils/useDashboardContext";
import { FETCH_PING_QUERY } from "../../utils/graphql";

export default function Feed() {
  const classes = useStyles();
  const { pingId } = useParams();
  const [state, dispatch] = useDashboardContext();
  const { loading, data } = useQuery(FETCH_PING_QUERY, {
    variables: { pingId },
  });

  const getComments = () => {
    const comments = data.getPing.comments;
    const commentComponents = comments.map((comment) => (
      <Comment key={comment.id} {...comment} />
    ));
    return commentComponents;
  };

  return (
    <Paper className={classes.root}>
      {!loading && (
        <>
          <Button color="primary" onClick={() => dispatch({ type: "rawfeed" })}>
            Raw Feed
          </Button>
          <h1>{`@${data.getPing.author.username}`}</h1>
          <h2>{data.getPing.body}</h2>
          <p>{`Total Support: ${data.getPing.supportCount}`}</p>
          <p>{`Posted ${moment(Number(data.getPing.createdAt)).fromNow()}`}</p>
          <hr />
          <NewComment pingId={data.getPing.id} />
          {getComments()}
        </>
      )}
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fcf8f2",
    height: "80vh",
    overflow: "auto",
    padding: theme.spacing(2),
  },
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