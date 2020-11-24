import React from "react";
import { useRouteMatch, useLocation, Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  FETCH_PINGS_QUERY,
  FETCH_SUPPORTED_PINGS_QUERY,
} from "../../utils/graphql";
import Feed from "./Feed";
import Loading from "../Loading";

export default function FeedType() {
  const route = useRouteMatch();
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const allPings = useQuery(FETCH_PINGS_QUERY, { skip: !route.isExact });
  const userPings = useQuery(FETCH_PINGS_QUERY, {
    skip: pathArray[2] !== "pinged",
  });
  const suppPings = useQuery(FETCH_SUPPORTED_PINGS_QUERY, {
    skip: pathArray[2] !== "supported",
    variables: { userId: pathArray[3] },
  });

  const pingedData = userPings.data?.getPings.filter((ping) => {
    return ping.author.id === pathArray[3];
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
