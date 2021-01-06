import { Schema, model } from 'mongoose';

//creat schema 

const ReportSchema = new Schema({
  type: {
    type: String, 
    enum: ['geojson'], 
    default: "geojson"
  },
  data: { 
    type: {
      type: String, 
      enum: ['Feature'], 
      default: "Feature"
    },
    geometry: {
      type: {
        type: String, 
        enum: ['Point'], 
        default: "Point"
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },

    },
    properties: {
    created_date: {
        type: Date,
        default: Date.now
    },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: [true, "Please provide a title"]},
    formattedAddress: String,
    category: {
      type: String,
      required: [true, "Please provide a category"], 
      enum: ["Mobility", "Audial", "Visual", "Cognitive", "Other"],
      default: "Mobility"},
      
    status: {
        type: String,
        enum: ["Reported", "Scheduled", "Fixed", "Unresolved"],
        default: "Reported",
        updated: {type: Date,
            default: Date.now}
    },  
  },
    
  },

    description: { type: String, required: [true, "Please provide a description"]},
    
    user_comments: [
        {author: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User author needed"] },
         created_date:  {type: Date, default: Date.now},
        comment: String
        }],

})



const Report = model('Report', ReportSchema);

export default Report;