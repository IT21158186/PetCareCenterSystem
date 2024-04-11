import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var appointmentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "users"
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','approved']
    },
    timeSlot:{
        type: String,
        required: true,
    },
    date:{
        type:Date
    }
},{
    timestamps:true
});

//Export the model
const AppointmentModel = mongoose.model('appointments', appointmentSchema);
export default AppointmentModel