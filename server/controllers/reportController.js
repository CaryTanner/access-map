import Report from '../models/reportModel'
import {addressLookUp} from '../utils/geocoder'

export const getAllReports = async(req, res) => {
    try{
    const reports = await Report.find({});
    if (!reports) throw Error("Could not retrieve reports");

    res.status(200).json({
      status: "success",
      reports
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const getSingleReport = async(req, res) => {
    try{
        const report = await Report.findById(req.params.id)
        if (!report) throw Error("Could not retrieve report");

        res.status(200).json({
            status: "success",
            report
          });
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
}

export const createReport= async(req, res) => {
    try{
        
        const {category, address, description, title, status } = req.body

        if (!category || !address  || !description || !title)
        return res.status(400).json({ msg: "Please enter all fields" });


        //api call to mapbox geocoder
        const results = await addressLookUp(address)
        if(!results) throw Error('Problem with geocoding')


        const newReport = new Report({
            data: { 
              geometry: {
                coordinates: results.geometry.coordinates
              },
              properties: {
                created_by: req.user.id,
                title,
                formattedAddress: results.place_name,
                category,
                status
              }
            },
            description
            
        })

        const registeredReport = await newReport.save()
        if(!registeredReport) throw Error("Could not save report")

        res.status(200).json({
            status: "success",
            registeredReport 
          });


    } catch (err){
        res.status(501).json({ error: err.message });
    }
}

export const updateReport= async(req, res) => {
    try{

    } catch (err){
        
    }
}

export const adminUpdateReport= async(req, res) => {
    try{

    } catch (err){
        
    }
}

export const deleteReport= async(req, res) => {
    try{

    } catch (err){
        
    }
}