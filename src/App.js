import React, { useState, useEffect } from "react"
import { CssBaseline, Grid } from "@material-ui/core"

import { getPlacesData, getWeatherData } from "./api/index"
import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"

//checkout billing status
//https://console.cloud.google.com/billing/01BE65-F9BC17-52B4BB/payment?authuser=2&project=travelsuggestions

//For the first useEffect
// we are destructuring the incoming data by doing coords and also destructirng the data insiddee the coords
// so its like this
// {data:
//     blahblah: ...,
//     coords:
//         blahblah...,
//         latitude: "23525",
//         longitude: "23525",
// blahblah: ...,
// }

function App() {
    const [places, setPlaces] = useState([])
    const [weatherData, setWeatherData] = useState([])

    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [childClicked, setChildClicked] = useState(null)

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    const [type, setType] = useState("restaurants")
    const [rating, setRating] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        //this is a built in function, for the function below check the long comment above

        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating)

        setFilteredPlaces(filteredPlaces)
    }, [rating])

    useEffect(() => {
        console.log(coordinates, bounds)
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)

            getWeatherData(coordinates.lat, coordinates.lng).then((data) => setWeatherData(data))

            getPlacesData(type, bounds.sw, bounds.ne) //because this is an async function we have to call .then on it
                .then((data) => {
                    //remember, data is what we return
                    // console.log(data)
                    setPlaces(data.filter((place) => place.name && place.num_reviews > 0))
                    setFilteredPlaces([])
                    setIsLoading(false)
                })
        }
    }, [type, bounds])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List
                        rating={rating}
                        setRating={setRating}
                        type={type}
                        setType={setType}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App
