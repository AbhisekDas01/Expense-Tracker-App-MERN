import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ['#875CF5' , "#FA2C37" , '#FF6900'];

export default function FinanceOverview({totalBalance , totalExpense , totalIncome}) {

    const balaceData = [
        {name : "Total Balance" , amount : totalBalance},
        {name : "Total Expense" , amount : totalExpense},
        {name : "Total Income" , amount : totalIncome}
    ]

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            <CustomPieChart
                data = {balaceData}
                label = "Total Balance"
                totalAmount = {`${totalBalance}`}
                colors = {COLORS}
                showTextAnchor
            />

        </div>
    )
}