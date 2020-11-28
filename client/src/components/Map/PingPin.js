import React from 'react'
import { Marker } from "react-map-gl";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

export default function PingPins({ long, latt }) {
    return (
        <Marker
            latitude={latt}
            longitude={long}
            offsetLeft={-19}
            offsetTop={-37}
        >
            <PlaceTwoTone
                style={{ fontSize: "40px", color: "blue" }}
            ></PlaceTwoTone>
        </Marker>
    )
}
