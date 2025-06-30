import Expense from "../models/expense.model.js"
import mongoose from "mongoose";
import xlsx from 'xlsx'

//add expense source
export const addExpense = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    const userId = req.user.id;

    try {

        const {
            icon,
            category,
            amount,
            date
        } = req.body;

        //check for the missing fileds 
        if (!category || !amount || !date) {
            const error = new Error("All fields are mandetory !");
            error.statusCode = 400;
            throw error;
        }

        const expense = await Expense.create([{
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        }] , {session})

        await session.commitTransaction();

        res.status(200).json(
            {expense : expense[0]}
        )

    } catch (error) {

        await session.abortTransaction();

        const status = error.statusCode || 500;
        res.status(status).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    } finally {
        session.endSession();
    }
}

//get all Expense
export const getAllExpense = async (req, res) => {

    const userId = req.user.id;

    try {

        const expense = await Expense.find({ userId }).sort({ date: -1 });

        res.status(200).json(expense);


    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

//download the excel
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        // 1. Fetch user's Expense records
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // 2. Transform data for Excel format
        const data = expense.map((item) => ({
            Category: item.category,  // Changed from Source to Category and item.source to item.category
            Amount: item.amount,
            Date: item.date,
        }));

        // 3. Create Excel workbook structures in memory
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // Write the file to a buffer
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=expense_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        
        res.send(buffer);
    } catch (error) {
        res.status(500).json({
            message: "download failed!"
        });
    }
}

//delete expense
export const deleteExpense = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    const id = req.params.id;

    try {

        //check if the record exists or not
        const expense = await Expense.findOne({
            _id: id,
            userId: req.user.id
        })


        if (!expense) {
            const error = new Error("Expense not found or unauthorized");
            error.statusCode = 404;
            throw error;
        }

        await Expense.findByIdAndDelete(id , {session});

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });


    } catch (error) {

        await session.abortTransaction();

        const status = error.statusCode || 500;
        res.status(status).json({
            success: false,
            message: error.message || "Failed to delete expense"
        })
    } finally {
        session.endSession();
    }
}