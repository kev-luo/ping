import React, { useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { NEW_PING_SUBSCRIPTION, FETCH_PINGS_BY_LOCATION } from "../../utils/graphql";
import { useDashboardContext } from "../../utils/useDashboardContext";
import Feed from "./Feed";
import Loading from "../Loading";

export default function FeedType() {
  const [{userPosition}] = useDashboardContext();
  let long;
  let latt;

  if(userPosition) {
    long = userPosition.longitude;
    latt = userPosition.latitude;
  }
  
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const { subscribeToMore, loading, error, data } = useQuery(FETCH_PINGS_BY_LOCATION,
    { skip: !userPosition, variables: { long, latt } });
  
  

  useEffect(() => {
    const unsubscribe = newPingSubscription();
    return () => unsubscribe();
  }, [])

  function newPingSubscription() {
    return subscribeToMore({
      document: NEW_PING_SUBSCRIPTION,
      updateQuery: (prevPings, { subscriptionData }) => {
        if(!subscriptionData) return prevPings;
        const pingAdded = subscriptionData.data.newPing;
        return {
          ...prevPings,
          getPingsByLocation: [pingAdded, ...prevPings.getPingsByLocation]
        }
      }
    })
  }

  const supportedPings = data?.getPingsByLocation.filter((ping) => {
    const isUserPresent = ping.support.filter((supporter) => {
      return supporter.user.id === pathArray[3] && supporter.supported === true;
    });
    return isUserPresent.length > 0;
  });

  const newPings = data?.getPingsByLocation.filter((ping) => {
    const isUserPresent = ping.support.filter((supporter) => {
      return supporter.user.id === pathArray[2];
    });
    return isUserPresent.length === 0;
  });

  const authoredPings = data?.getPingsByLocation.filter((ping) => {
    return ping.author.id === pathArray[3];
  });

  return (
    <Switch>
      <Route exact path="/">
        {data ? <Feed data={data.getPingsByLocation} feedType="All"/> : <Loading />}
      </Route>
      <Route exact path="/user/:userId">
        {newPings ? <Feed data={newPings} feedType="New"/> : <Loading />}
      </Route>
      <Route exact path="/user/pinged/:userId">
        {authoredPings ? <Feed data={authoredPings} feedType="Posted"/> : <Loading />}
      </Route>
      <Route exact path="/user/supported/:userId">
        {supportedPings ? <Feed data={supportedPings} feedType="Supported"/> : <Loading />}
      </Route>
    </Switch>
  );
}
