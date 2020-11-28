import React, { useEffect } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";

import Loading from "../Loading";
import Comment from "./Comment";
import NewComment from "./NewComment";
import {
  FETCH_PING_QUERY,
  NEW_COMMENT_SUBSCRIPTION,
} from "../../utils/graphql";

export default function Feed() {
  const classes = useStyles();
  const { pingId } = useParams();
  const history = useHistory();
  const { subscribeToMore, loading, data } = useQuery(FETCH_PING_QUERY, {
    variables: { pingId },
  });
  useEffect(() => {
    const unsubscribe = newCommentSubscription();
    return () => unsubscribe();
  }, []);

  function newCommentSubscription() {
    return subscribeToMore({
      document: NEW_COMMENT_SUBSCRIPTION,
      variables: { pingId },
      updateQuery: (prevPing, { subscriptionData }) => {
        if (!subscriptionData) return prevPing;
        return {
          ...prevPing,
          getPing: subscriptionData.getPing,
        };
      },
    });
  }

  const getComments = () => {
    const comments = data?.getPing?.comments;
    const commentComponents = comments.map((comment) => (
      <Comment key={comment.id} {...comment} />
    ));
    return commentComponents;
  };

  return (
    <>
      <Paper className={classes.root}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Button color="primary" onClick={() => history.goBack()}>
              Go Back
            </Button>
            <Typography variant="h6">
              {`@${data.getPing.author.username}`}
            </Typography>
            <div className={classes.metaContainer}>
              <Typography variant="subtitle2">
                {`${data.getPing.supportCount} Supported`}
              </Typography>
              <Typography variant="subtitle2">
                {`Posted ${moment(Number(data.getPing.createdAt)).fromNow()}`}
              </Typography>
            </div>
            <Typography variant="body1">{data.getPing.body}</Typography>
            {data.getPing.imageUrl && (
              <img src={data.getPing.imageUrl} style={{ maxHeight: "250px" }} />
            )}
            <NewComment pingId={data.getPing.id} />
          </>
        )}
      </Paper>
      {loading ? <Loading /> : getComments()}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    maxHeight: "80vh",
    overflow: "auto",
    padding: theme.spacing(2),
  },
  backLink: {
    textDecoration: "none",
  },
  metaContainer: {
    display: "flex",
    marginBottom: "1rem",
    "& > *": {
      marginRight: "0.34rem",
      color: "#C0C0C0",
      fontSize: "12px",
      textDecoration: "none",
      "& > * ": {
        fontSize: "12px",
      },
    },
  },
}));
