import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
}

export default function Map() {
  const classes = useStyles();
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, [])

  const getUserPosition = () => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setViewport({...viewport, latitude, longitude})
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
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
        >
          <div className={classes.navigationControl}>
            <NavigationControl
             onViewportChange={newViewport => setViewport(newViewport)}
             />
          </div>
          
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