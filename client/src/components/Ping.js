import React from "react";
import moment from "moment";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useQuery } from "@apollo/client";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useDashboardContext } from "../utils/useDashboardContext";
import { FETCH_PING_QUERY } from "../utils/graphql";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     margin: theme.spacing(2, 1),
//     padding: theme.spacing(0, 2),
//     paddingRight: 0,
//   },
//   pic: {
//     width: theme.spacing(6),
//     height: theme.spacing(6),
//   },
//   date: {
//     color: theme.palette.text.secondary,
//     fontSize: 12,
//   },
// }));

export default function Feed() {
  // const classes = useStyles();
  const [state, dispatch] = useDashboardContext();
  const {
    loading,
    data: { getPing },
  } = useQuery(FETCH_PING_QUERY, {
    variables: { pingId: state.details },
  });

  const getComments = () => {
    const comments = getPing.comments;
    const commentComponents = comments.map((comment) => (
      <Comment key={comment.id} {...comment} />
    ));
    return commentComponents;
  };

  return (
    <>
      {!loading && (
        <>
          <Button color="primary" onClick={() => dispatch({ type: "rawfeed" })}>
            Raw Feed
          </Button>
          <h1>{`@${getPing.author.username}`}</h1>
          <h2>{getPing.body}</h2>
          <p>{`Total Support: ${getPing.supportCount}`}</p>
          <p>{`Posted ${moment(Number(getPing.createdAt)).fromNow()}`}</p>
          <hr />
          <NewComment pingId={getPing.id} />
          {getComments()}
        </>
      )}
    </>
  );
}
