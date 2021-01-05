const geoCodingService = require('@mapbox/mapbox-sdk/services/geocoding')

import dotenv from 'dotenv';
dotenv.config();

const geoCodingClient = geoCodingService({accessToken: process.env.MAPBOX_API_KEY})



export const addressLookUp = async (queryString)=>{
    const resp = await geoCodingClient.forwardGeocode({
        query: queryString,
        limit: 1,
        countries: ["SE"],
        proximity: [18.0686, 59.3293],
        
      })
        .send()
        const results = resp.body.features[0]
        console.log(resp.body.features[0])
   return results     
}