import React from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link, useHistory } from "react-router-dom";

import Comment from "./Comment";
import NewComment from "./NewComment";
import { useDashboardContext } from "../../utils/useDashboardContext";
import { FETCH_PING_QUERY } from "../../utils/graphql";

export default function Feed() {
  const classes = useStyles();
  const { pingId } = useParams();
  const history = useHistory();
  const [state, dispatch] = useDashboardContext();
  const { loading, data } = useQuery(FETCH_PING_QUERY, {
    variables: { pingId },
  });

  if(!loading) {
    console.log(data.getPing.imageUrl);
  }

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
          <Link onClick={() => history.goBack()} className={classes.backLink}>
            <Button
              color="primary"
              onClick={() => dispatch({ type: "rawfeed" })}
            >
              Go Back
            </Button>
          </Link>
          <h1>{`@${data.getPing.author.username}`}</h1>
          <h2>{data.getPing.body}</h2>
          <img src={data.getPing.imageUrl} style={{ maxHeight: "250px"}}/>
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
  backLink: {
    textDecoration: "none"
  }

}));
