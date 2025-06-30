import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import toast from "react-hot-toast";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

export default function Expense() {

    useUserAuth();


    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(
        {
            show: false,
            data: null
        }
    )

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);


    //get All expense data
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);


        try {

            const respone = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)

            if (respone.data) {
                setExpenseData(respone.data);
            }

        } catch (error) {

            console.log("Something went wrong!", error)
        } finally {
            setLoading(false);
        }
    };

    //handle add expense
    const handleAddExpense = async (expense) => {
        const {
            category,
            amount,
            date,
            icon
        } = expense;

        //validation checks 
        if (!category.trim()) {
            toast.error("Category is required!");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0!");
            return;
        }

        if (!date) {
            toast.error("Date is required!");
            return;
        }

        //post the data
        try {

            await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`, {
                category,
                icon,
                date,
                amount
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();

        } catch (error) {
            console.error("Error adding expense!", error.respone?.data?.message || error.message);
        }


    };


    const deleteExpense = async (id) => {

        try {

            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense detail deleted successfully")
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error deleting expense", error.respone?.data?.message || error.message)
        }
    };

    //handle download expense details 
    const handleDownloadExpenseDetails = async () => {

         try {
            const respone = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: 'blob'
            })

            //create url 
            const url = window.URL.createObjectURL(new Blob([respone.data]))

            const link = document.createElement('a')
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx")
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading expense details:  " ,error);
            toast.error("Failed to download expense details! , Please try again...")
        }
     };


    useEffect(() => {
        fetchExpenseDetails();
    }, [])

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}

                        />
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}

                        onDownload={handleDownloadExpenseDetails}
                    />

                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >

                    <AddExpenseForm onAddExpense={handleAddExpense} />

                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense detail ?"
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                    />

                </Modal>
            </div>
        </DashboardLayout>
    )
}