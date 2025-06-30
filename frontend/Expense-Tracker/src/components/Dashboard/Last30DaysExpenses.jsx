import { useEffect, useState } from "react"
import { prepareExpenseBarCharData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

export default function Last30DaysExpenses({data}){

    const [chartData , setChartData] = useState([]);

    useEffect(() => {
        
        const result = prepareExpenseBarCharData(data);
        setChartData(result);
    } , [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expense</h5>

            </div>

            <CustomBarChart data = {chartData} />
        </div>
    )
}