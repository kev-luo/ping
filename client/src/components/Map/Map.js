import React, { useEffect } from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import { useDashboardContext } from "../../utils/useDashboardContext";
import Actions from "../../utils/dashboardActions";

export default function Map() {
  const classes = useStyles();
  const [{ viewport, userPosition }, dispatch] = useDashboardContext();

  useEffect(() => {
    getUserPosition();
  }, [])

  const getUserPosition = () => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        dispatch({type: Actions.UPDATE_VIEWPORT, payload: { ...viewport, latitude, longitude }});
        dispatch({ type: Actions.UPDATE_USER_POSITION, payload: { latitude, longitude }});
      })
    }
  }

  return (
    <Grid item>
      <Paper className={classes.paper} >
      <ReactMapGL 
        width="100%"
        height= "100%"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiZ29vZGx2biIsImEiOiJja2h6OXcwdG0wcXo5MnJubXRkcm93bGh4In0.7lgoZXg3FQincUmupVj4tQ"
        onViewportChange={newViewport => { dispatch({ type: Actions.UPDATE_VIEWPORT, payload: newViewport }) }}
        {...viewport}
      
        >
          <div className={classes.navigationControl}>
            <NavigationControl
             onViewportChange={newViewport => { dispatch({ type: Actions.UPDATE_VIEWPORT, payload: newViewport }) }}
             />
          </div>
          {userPosition && (
            <Marker 
              latitude={userPosition.latitude}
              longitude={userPosition.longitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <PlaceTwoTone 
              style={{fontSize: "40px", color: "red"}}
              ></PlaceTwoTone>
            </Marker>
          )}
        </ReactMapGL>
      </Paper>
        

    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "#fcf8f2",
    height: "400px",
    width: "400px",
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
}));