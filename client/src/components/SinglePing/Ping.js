import React, { useEffect } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { Button, Paper } from "@material-ui/core";
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
            <h1>{`@${data.getPing.author.username}`}</h1>
            <h2>{data.getPing.body}</h2>
            <img src={data.getPing.imageUrl} style={{ maxHeight: "250px" }} />
            <p>{`Total Support: ${data.getPing.supportCount}`}</p>
            <p>{`Posted ${moment(
              Number(data.getPing.createdAt)
            ).fromNow()}`}</p>
            <hr />
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
    backgroundColor: "#fcf8f2",
    maxHeight: "80vh",
    overflow: "auto",
    padding: theme.spacing(2),
  },
  backLink: {
    textDecoration: "none",
  },
}));
