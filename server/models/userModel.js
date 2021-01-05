import { Schema, model } from 'mongoose';

//creat schema 

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Must have a password"],
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    role: {
            type: String,
            
            enum: ["User", "Admin"],
            default: "User",
         
    },
    reports:[{ type: Schema.Types.ObjectId, ref: "Report" }],
    active: {
        type: Boolean,
        default: true,
        select: false
      }

})

UserSchema.pre(/^find/, function(next) {
    this.find({ active: { $ne: false } });
    next();
  });

const User = model('User', UserSchema);

export default User;