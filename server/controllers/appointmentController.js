import AppoitmentModel from "../models/AppoitmentModel";



export const getAllApps = async(req,res)=>{
    try {
        const app = await AppoitmentModel.find();
        res.status(200).json(app)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}
export const createAppointment = async(req,res)=>{
    try {
        const data = req.body;

        const app = await AppoitmentModel.create(data);
        res.status(200).json(app)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}

export const updateAppointment = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = req.body;
        const app = await AppoitmentModel.findByIdAndUpdate(id,data);
        res.status(200).json(app)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}

export const getOneAppt = async(req,res)=>{
    try {
        const {id} = req.params;
        const app = await AppoitmentModel.findById(id);
        res.status(200).json(app)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}