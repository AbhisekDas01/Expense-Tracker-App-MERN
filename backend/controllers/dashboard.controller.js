import Income from "../models/income.model.js"
import Expense from "../models/expense.model.js"

import { isValidObjectId, Types } from "mongoose"

export const getDashboardData = async (req, res) => {

    try {

        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));


        //Fetch total income and expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])


        //get income transaction in the last 60 days 
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        //get total income of last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

        //get expense of last 30 days 
        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // get total expense for last 30 day 
        const expenseLast30Days = last30DaysExpenseTransaction.reduce((sum, transaction) => sum + transaction.amount, 0)


        //fetch last 5 transaction (income + expense)
        const lastTransactions = [
            ...((await Income.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),// Convert Mongoose document to plain JavaScript object
                type: 'income'
            }))
            ),
            ...((await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),
                type: 'expense'
            })))
        ].sort((a , b) => b.date - a.date); //Sort latest first (desc)


        //final response
        res.status(200).json({
            totalBalance : (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome : totalIncome[0]?.total || 0,
            totalExpense : totalExpense[0]?.total || 0,
            last30DaysExpense : {
                total : expenseLast30Days,
                transactions : last30DaysExpenseTransaction
            },
            last60DaysIncomeTransactions : {
                total : incomeLast60Days,
                transactions : last60DaysIncomeTransactions
            },
            recentTransaction : lastTransactions
        })

    } catch (error) {

        res.status(500).json({
            message : "Server error ", error
        })
    }
}