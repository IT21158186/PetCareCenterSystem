import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var transactionSchema = new mongoose.Schema({
    cardId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Card"
    },
    amount: {
        type: String,
        required: true,
    },
    qty:{
        type:Number,
        min:1,

    },
    productId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Item"
    },
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "users"
    },
},{
    timestamps:true
});

//Export the model
const TransactionModel = mongoose.model('Transaction', transactionSchema);
export default TransactionModel