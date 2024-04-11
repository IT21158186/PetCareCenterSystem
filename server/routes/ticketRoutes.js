import express from 'express'
import { loginValidator } from '../middlewares/loginValidator.js';
import { createTick, getAllTick, getMyReplies, getMyTickets, getOneTick, reply, updateTick } from '../controllers/ticketController.js';
const ticketRouter = express.Router();

ticketRouter.get('/',getAllTick)
ticketRouter.get('/my',loginValidator,getMyTickets)
ticketRouter.get('/my/reply',loginValidator,getMyReplies)
ticketRouter.get('/:id',getOneTick)

ticketRouter.post('/',loginValidator, createTick)
ticketRouter.post('/reply/:ticketId', reply)
ticketRouter.put('/:id', updateTick);

export default ticketRouter;