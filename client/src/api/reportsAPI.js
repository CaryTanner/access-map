import axios from 'axios'

export const mapbox_public_key = "pk.eyJ1IjoiY2FyeWxhbmRvbiIsImEiOiJja2phM2Qzcmw3YWR4MzFxanR1bHQ1Z3Q4In0.XIL9ACe-ILuq-Iz64LVxiw"

export const getAllReports = async () => {
 try {
     const resp = await axios.get("/api/reports")
    
     return resp.data
 } catch (err) {
   return err.response
 }
}


export const getSingleReport = async () => {
    try{
   
    } catch (err) {
   
    }
   }
