import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { FETCH_PINGS_QUERY } from "../../utils/graphql";
import Feed from "./Feed";
import Loading from "../Loading";

export default function FeedType() {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const { data } = useQuery(FETCH_PINGS_QUERY);

  const supportedPings = data?.getPings.filter((ping) => {
    const isUserPresent = ping.support.filter((supporter) => {
      return supporter.user.id === pathArray[3] && supporter.supported === true;
    });
    return isUserPresent.length > 0;
  });

  const newPings = data?.getPings.filter((ping) => {
    const isUserPresent = ping.support.filter((supporter) => {
      return supporter.user.id === pathArray[2];
    });
    return isUserPresent.length === 0;
  });

  const authoredPings = data?.getPings.filter((ping) => {
    return ping.author.id === pathArray[3];
  });

  return (
    <Switch>
      <Route exact path="/">
        {data ? <Feed data={data.getPings} /> : <Loading />}
      </Route>
      <Route exact path="/user/:userId">
        {newPings ? <Feed data={newPings} /> : <Loading />}
      </Route>
      <Route exact path="/user/pinged/:userId">
        {authoredPings ? <Feed data={authoredPings} /> : <Loading />}
      </Route>
      <Route exact path="/user/supported/:userId">
        {supportedPings ? <Feed data={supportedPings} /> : <Loading />}
      </Route>
    </Switch>
  );
}
