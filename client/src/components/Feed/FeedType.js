import React from "react";
import {
  useRouteMatch,
  useLocation,
  Route,
  Switch,
} from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  FETCH_PINGS_QUERY,
  FETCH_SUPPORTED_PINGS_QUERY,
  FETCH_USER_QUERY,
} from "../../utils/graphql";
import Feed from "./Feed";
import Loading from "../Loading";

export default function FeedType() {
  const route = useRouteMatch();
  const { pathname } = useLocation();
  const allPings = useQuery(FETCH_PINGS_QUERY, { skip: !route.isExact });
  const suppPings = useQuery(FETCH_SUPPORTED_PINGS_QUERY, {
    skip: pathname.split("/")[2] !== "supported",
    variables: { userId: pathname.split("/")[3] },
  });
  const userPings = useQuery(FETCH_USER_QUERY, {
    skip: pathname.split("/")[2] !== "pinged",
    variables: { userId: pathname.split("/")[3] },
  });

  const pingedData = userPings.data?.getUser.pings.map((ping) => {
    const author = userPings.data.getUser;
    return { ...ping, author: { id: author.id, username: author.username } };
  });

  return (
    <Switch>
      <Route exact path="/">
        {allPings.data ? <Feed data={allPings.data.getPings} /> : <Loading />}
      </Route>
      <Route exact path="/user/pinged/:userId">
        {userPings.data ? <Feed data={pingedData} /> : <Loading />}
      </Route>
      <Route exact path="/user/supported/:userId">
        {suppPings.data ? (
          <Feed data={suppPings.data.getSupportedPings} />
        ) : (
          <Loading />
        )}
      </Route>
    </Switch>
  );
}
