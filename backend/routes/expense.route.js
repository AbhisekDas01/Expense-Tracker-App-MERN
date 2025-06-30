import {Router} from 'express'
import {protect} from "../middleware/auth.middleware.js"
import {
    addExpense,
    getAllExpense,
    downloadExpenseExcel,
    deleteExpense
} from '../controllers/expense.controller.js';

const expenseRouter = Router();

expenseRouter.post('/add' , protect , addExpense);
expenseRouter.get('/get' , protect , getAllExpense);
expenseRouter.get('/downloadexcel' , protect , downloadExpenseExcel);
expenseRouter.delete('/:id' , protect , deleteExpense);



export default expenseRouter;