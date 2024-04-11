import express from 'express'
import { loginValidator } from '../middlewares/loginValidator.js';
import { createAppointment, getAllApps, getOneAppt, updateAppointment } from '../controllers/appointmentController.js';
const appRoutes = express.Router();

appRoutes.get('/',getAllApps)
appRoutes.get('/:id',getOneAppt)

appRoutes.post('/',loginValidator, createAppointment)
appRoutes.put('/:id', updateAppointment);

export default appRoutes;