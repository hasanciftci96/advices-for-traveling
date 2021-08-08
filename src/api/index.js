import axios from "axios"

export const getPlacesData = async (type, sw, ne) => {
    try {
        const {
            data: { data },
        } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                "x-rapidapi-key": "1b2b37235dmsh65fd5d5a299ed18p1f9b45jsna163d5ad4751",
                "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            },
        })
        return data
    } catch (err) {
        console.error(err.message)
    }
}

export const getWeatherData = async (lat, lng) => {
    try {
        const { data } = await axios.get("https://community-open-weather-map.p.rapidapi.com/find", {
            params: {
                lon: lng,
                lat: lat,
            },
            headers: {
                "x-rapidapi-key": "1b2b37235dmsh65fd5d5a299ed18p1f9b45jsna163d5ad4751",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            },
        })
    } catch (err) {
        console.error(err.message)
    }
}
