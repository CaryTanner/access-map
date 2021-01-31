import {mapbox_public_key} from './reportsAPI'

import axios from 'axios'

const forwardEndpoint = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const boundingBox = "?bbox=17.77461405663,59.125781,18.4248425,59.479973"
const proximity = "&proximity=18.07178990362403,59.323730425969565"


export const forwardGeoSearch =  async (searchQuery) => {
    console.log(searchQuery)
    let query = encodeURI(searchQuery)
    console.log(query)
    const results = await axios.get(forwardEndpoint + query + ".json" + boundingBox + proximity + "&access_token=" + mapbox_public_key ) 
console.log('fetch sugs')
    return results
}

//"https://api.mapbox.com/geocoding/v5/mapbox.places/starbucks.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiY2FyeWxhbmRvbiIsImEiOiJja2phM2Qzcmw3YWR4MzFxanR1bHQ1Z3Q4In0.XIL9ACe-ILuq-Iz64LVxiw"
