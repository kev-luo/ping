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
  const { loading, data } = useQuery(FETCH_PINGS_QUERY);

  const transformedPings =
    pathArray[2] === "supported"
      ? data?.getPings.filter((ping) => {
          return (
            ping.support.filter(
              (supporter) =>
                supporter.user.id === pathArray[3] && supporter.supported
            ).length > 0
          );
        })
      : data?.getPings.filter((ping) => {
          return ping.author.id === pathArray[3];
        });

  return (
    <Switch>
      <Route exact path="/">
        {data ? <Feed data={data.getPings} /> : <Loading />}
      </Route>
      {/* <Route exact path="/user/:userId">
        {data ? <Feed data={data.getPings} /> : <Loading />}
      </Route> */}
      <Route exact path="/user/pinged/:userId">
        {data ? <Feed data={transformedPings} /> : <Loading />}
      </Route>
      <Route exact path="/user/supported/:userId">
        {data ? <Feed data={transformedPings} /> : <Loading />}
      </Route>
    </Switch>
  );
}
