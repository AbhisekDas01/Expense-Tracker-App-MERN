import User from "../models/user.model.js"
import Income from "../models/income.model.js"
import mongoose from "mongoose";
import xlsx from 'xlsx'

//add income source
export const addIncome = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    const userId = req.user.id;

    try {

        const {
            icon,
            source,
            amount,
            date
        } = req.body;

        //check for the missing fileds 
        if (!source || !amount || !date) {
            const error = new Error("All fields are mandetory !");
            error.statusCode = 400;
            throw error;
        }

        const income = await Income.create([{
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        }] , {session})

        await session.commitTransaction();

        res.status(200).json({
            income : income[0]
        }
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

//get all income
export const getAllIncome = async (req, res) => {

    const userId = req.user.id;

    try {

        const income = await Income.find({ userId }).sort({ date: -1 });

        res.status(200).json(income);


    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

//download the excel
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        // 1. Fetch user's income records
        const income = await Income.find({ userId }).sort({ date: -1 });

        // 2. Transform data for Excel format
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        // 3. Create Excel workbook structures in memory
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Write the file to a buffer
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=income_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        
        res.send(buffer);
    } catch (error) {
        res.status(500).json({
            message: "download failed!"
        });
    }
}

//delete income
export const deleteIncome = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    const id = req.params.id;

    try {

        //check if the record exists or not
        const income = await Income.findOne({
            _id: id,
            userId: req.user.id
        })


        if (!income) {
            const error = new Error("Income not found or unauthorized");
            error.statusCode = 404;
            throw error;
        }

        await Income.findByIdAndDelete(id , {session});

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Income deleted successfully"
        });


    } catch (error) {

        await session.abortTransaction();

        const status = error.statusCode || 500;
        res.status(status).json({
            success: false,
            message: error.message || "Failed to delete income"
        })
    } finally {
        session.endSession();
    }
}