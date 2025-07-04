import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

export default function Income() {

    useUserAuth();

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(
        {
            show: false,
            data: null
        }
    )

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    //get All income data
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);


        try {

            const respone = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)

            if (respone.data) {
                setIncomeData(respone.data);
            }

        } catch (error) {

            console.log("Something went wrong!", error)
        } finally {
            setLoading(false);
        }
    };

    //handle add income 
    const handleAddIncome = async (income) => {
        const {
            source,
            amount,
            date,
            icon
        } = income;

        //validation checks 
        if (!source.trim()) {
            toast.error("Source is required!");
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

            await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, {
                source,
                icon,
                date,
                amount
            });

            setOpenAddIncomeModal(false);
            toast.success("Income added successfully");
            fetchIncomeDetails();

        } catch (error) {
            console.error("Error adding income!", error.respone?.data?.message || error.message);
        }


    };

    //Delete income 
    const deleteIncome = async (id) => {

        try {

            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income detail deleted successfully")
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error deleting income", error.respone?.data?.message || error.message)
        }
    };

    //handle download income details 
    const handleDownloadIncomeDetails = async () => {

        try {
            const respone = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob'
            })

            //create url 
            const url = window.URL.createObjectURL(new Blob([respone.data]))

            const link = document.createElement('a')
            link.href = url;
            link.setAttribute("download", "income_details.xlsx")
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading income details:  " ,error);
            toast.error("Failed to download income details! , Please try again...")
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id })
                        }}
                        onDownload={handleDownloadIncomeDetails}
                    />

                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >

                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income detail ?"
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                    />

                </Modal>

            </div>
        </DashboardLayout>
    )
}