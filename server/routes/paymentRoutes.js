import express from 'express'
import { loginValidator } from '../middlewares/loginValidator.js';
import { deleteCardDetails, getAllCards, getAllTransactions, getCardDetails, getOneCard, saveCardDetails, updateCardDetails } from '../controllers/paymentController.js';
const payRouter = express.Router();

payRouter.get('/', loginValidator,getCardDetails)
payRouter.get('/transactions',loginValidator, getAllTransactions )
payRouter.get('/all',getAllCards)
payRouter.get('/:id',getOneCard )


payRouter.post('/save',loginValidator, saveCardDetails)
payRouter.put('/:id', updateCardDetails);
payRouter.delete('/:id', deleteCardDetails)



export default payRouter;