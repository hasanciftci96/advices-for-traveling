import React from "react"
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating from "@material-ui/lab/Rating"

import useStyles from "./styles"

const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked }) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery("(min-width:600px)")

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBRlFgj3jhCbYNEtq7AbeyTwq8UgagFdes" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={""}
                onChange={(e) => {
                    // for more info on setCoordinates and setBounds check the console.log
                    //console.log(e)
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {/* onChildClick is an event listener that lets you carry data from the main component to the one displayed by it, aka child component*/}

                {places?.map((place, i) => (
                    <div
                        key={i}
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                    >
                        {!isDesktop ? (
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img
                                    className={classes.pointer}
                                    src={
                                        place.photo
                                            ? place.photo.images.large.url
                                            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                                    }
                                    alt={place.name}
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly />\{" "}
                            </Paper>
                        )}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map
