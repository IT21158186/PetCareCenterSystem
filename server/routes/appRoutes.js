import express from 'express'
import { loginValidator } from '../middlewares/loginValidator.js';
import { createAppointment, getAllApps, getMyApps, getOneAppt, updateAppointment } from '../controllers/appointmentController.js';
const appRoutes = express.Router();

appRoutes.get('/',getAllApps)
appRoutes.get('/my',loginValidator,getMyApps)
appRoutes.get('/:id',getOneAppt)

appRoutes.post('/',loginValidator, createAppointment)
appRoutes.put('/:id', updateAppointment);

export default appRoutes;