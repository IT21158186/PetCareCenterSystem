import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var appoitSchema = new mongoose.Schema({
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
        enum:['pending','resolved']
    }
},{
    timestamps:true
});

//Export the model
const AppoitmentModel = mongoose.model('appoitments', appoitSchema);
export default AppoitmentModel