import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var ticketSchema = new mongoose.Schema({
    subject:{
        type:String,
        required: true,
    },
    description: {
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
        enum:['pending','resolved']
    }
},{
    timestamps:true
});

//Export the model
const AppointmentModel = mongoose.model('tickets', ticketSchema);
export default AppointmentModel