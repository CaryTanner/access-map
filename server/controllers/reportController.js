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
        
        const {category, address, description, title } = req.body

        if (!category || !address  || !description || !title)
        return res.status(400).json({ msg: "Please enter all fields" });


        //api call to mapbox geocoder
        const results = await addressLookUp(address)
        if(!results) throw Error('Problem with geocoding')


        const newReport = new Report({
            title,
            created_by: req.user.id,
            category,
            description,
            location: {
                coordinates: results.geometry.coordinates,
                formattedAddress: results.place_name
            }

        })

        const registeredReport = await newReport.save()
        if(!registeredReport) throw Error("Could not save report")

        res.status(200).json({
            status: "success",
            report: {
                id: registeredReport._id,
                title: registeredReport.title,
                created_by: registeredReport.created_by,
                category: registeredReport.category,

                description: registeredReport.description,
                location: registeredReport.location,
                status: registeredReport.status,
            } 
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