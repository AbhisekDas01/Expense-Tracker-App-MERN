import moment from 'moment';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    return regex.test(email);
}


//Get the initial letters of the name 
export const getInitials = (name) => {

    if(!name) return "";

    const words = name.split(' ');
    let initials = "";

    for(let i = 0 ; i < Math.min(words.length , 2) ; i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

// add comma to values 
export const addThousandsSeparator = (num) => {

    if(num == null || isNaN(num)) return "0";

    const [integerPart , fractinalPart] = num.toString().split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractinalPart? `${formattedInteger}.${fractinalPart}` : formattedInteger;
}

export const prepareExpenseBarCharData = (data = []) => {
    const chartData = data.map((item) => ({
        category : item?.category,
        amount : item?.amount
    }))

    return chartData;
}


export const prepareIncomeBarChartData =(data = []) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item)=> ({
        month : moment(item?.date).format('Do MMM'),
        amount : item?.amount,
        source : item?.source,

    }))

    return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {

    const sortedData = [...data].sort((a , b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month : moment(item?.date).format('Do MMM'),
        amount : item?.amount,
        category : item?.category
    }))

    return chartData;

}