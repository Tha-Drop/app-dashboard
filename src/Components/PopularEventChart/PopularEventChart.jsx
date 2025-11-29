import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const PopularEventChart = () => {
    const data = [
        { name: 'Holiday Parties', value: 40 },
        { name: 'Tattoo Parties', value: 25 },
        { name: 'Big Events', value: 20 },
        { name: 'Park Events', value: 15 },
    ];

    const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#FCA5A5'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='w-full h-[234px]'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={98}
                        fill="#8884d8"
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PopularEventChart