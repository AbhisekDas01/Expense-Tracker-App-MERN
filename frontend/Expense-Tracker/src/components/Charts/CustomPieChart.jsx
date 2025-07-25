import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import CustomToolTip from "./CustomToolTip"
import CustomLegend from "./CustomLegend"

export default function CustomPieChart({data , label , totalAmount , colors , showTextAnchor}) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine= {false}
                >
                    {
                        data.map((entry , index) => (
                            <Cell key={`Cell-${index}`} fill={colors[index%colors.length]} />
                        ))
                    }
                    
                </Pie>
                <Tooltip content={<CustomToolTip/>}/>
                <Legend content={<CustomLegend/>}/>

                {showTextAnchor && (
                        <g>
                            <text
                                x='50%'
                                y = "50%"
                                dy = {-25}
                                textAnchor="middle"
                                fill="#666"
                                fontSize="14px"
                            >
                                {label}
                            </text>
                            <text
                                x="50%"
                                y = "50%"
                                dy={8}
                                textAnchor="middle"
                                fill="#333"
                                fontSize="24px"
                                fontWeight="semi-bold"
                            >
                                ${totalAmount}
                            </text>
                        </g>
                    )
                }
            </PieChart>
        </ResponsiveContainer>
    )
}