import express from 'express'
import { loginValidator } from '../middlewares/loginValidator.js';
import { createTick, getAllTick, getMyTickets, getOneTick, updateTick } from '../controllers/ticketController.js';
const ticketRouter = express.Router();

ticketRouter.get('/',getAllTick)
ticketRouter.get('/my',loginValidator,getMyTickets)
ticketRouter.get('/:id',getOneTick)

ticketRouter.post('/',loginValidator, createTick)
ticketRouter.put('/:id', updateTick);

export default ticketRouter;