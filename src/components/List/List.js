import React, { useState, useEffect, createRef } from "react"
import { CircularProgress, Grid, InputLabel, Typography, MenuItem, FormControl, Select } from "@material-ui/core"
import PlaceDetails from "../PlaceDetails/PlaceDetails"
import useStyles from "./styles"

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles()

    const [elRefs, setElRefs] = useState([])
    useEffect(() => {
        //_ in map means we don't want to use that element
        //We do this complex thing to create many many refs since there is a lot of cards on the google-map
        const refs = Array(places?.length)
            .fill()
            .map((_, i) => elRefs[i] || createRef())

        setElRefs(refs)
    }, [places])

    console.log({ childClicked })
    //use reactRefs to make a reference to another element
    return (
        <div className={classes.container}>
            <Typography variant="h4">Where to eat, stay or what to do</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.inputLabel}>Type</InputLabel>
                        <Select value={type} onChange={(event) => setType(event.target.value)}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.inputLabel}>Rating</InputLabel>
                        <Select value={rating} onChange={(event) => setRating(event.target.value)}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {/* i in the map is the index, it comes built-in with .map you can check mdn for more details */}
                        {/* we use curly braces if we want to open the .map as a function but in this case () is needed when returning jsx */}
                        {places?.map((place, i) => (
                            <Grid ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails place={place} selected={Number(childClicked) === i} refProp={elRefs[i]} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    )
}

export default List
