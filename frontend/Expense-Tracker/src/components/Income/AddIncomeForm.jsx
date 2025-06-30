import { useState } from "react"
import Input from '../../components/Inputs/Input'
import EmojiPickerPopup from "../EmojiPickerPopup";

export default function AddIncomeForm({onAddIncome}){
    const [income , setIncome] = useState({
        source : "",
        amount : "",
        date : "",
        icon : ""
    });

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (
        <div className="">

            <EmojiPickerPopup
                icon = {income.icon}
                onSelect = {(selectedIcon) => handleChange("icon" , selectedIcon)}
            />

            <Input
                value={income.source}
                onChange={(event) => handleChange("source" , event.target.value)}
                label="Income Source"
                placeholder="Freelancer , Salary, etc"
                type='text'
            />
            <Input
                value={income.amount}
                onChange={({target}) => handleChange("amount" , target.value)}
                label="Amount"
                placeholder=""
                type="number"

            />
            <Input
                value={income.date}
                onChange={({target}) => handleChange("date" ,target.value)}
                label="Date"
                placeholder=""
                type="date"

            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={()=> onAddIncome(income)}
                    className="add-btn add-btn-fill"
                >
                    Add Income
                </button>
            </div>
        </div>
    )
}