import { Router } from "express";
import {
    addIncome,
    getAllIncome,
    downloadIncomeExcel,
    deleteIncome

} from "../controllers/income.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const incomeRouter = Router();


incomeRouter.post('/add' , protect , addIncome);
incomeRouter.get('/get' , protect , getAllIncome);
incomeRouter.get('/downloadexcel' , protect , downloadIncomeExcel);
incomeRouter.delete('/:id' , protect , deleteIncome);

export default incomeRouter;