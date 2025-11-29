import { useState } from 'react';
import { Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// TODO: Import API hook when backend provides endpoint
// import { useGetEarningsOverviewQuery } from '../../redux/Api/dashboardApi';

const IncomeOverview = () => {
    const [selectedYear, setSelectedYear] = useState("2024");

    const items = [
        { label: "2023", value: "2023" },
        { label: "2024", value: "2024" },
        { label: "2025", value: "2025" },
        { label: "2026", value: "2026" },
    ];

    // TODO: Replace with API call when backend provides endpoint
    // const { data: apiData, isLoading } = useGetEarningsOverviewQuery(selectedYear);
    // const data = apiData?.data || defaultData;

    // Default/Static data - will be replaced by API response
    const defaultData = [
        { name: 'Jan', value: 20 },
        { name: 'Feb', value: 60 },
        { name: 'Mar', value: 45 },
        { name: 'Apr', value: 90 },
        { name: 'May', value: 50 },
        { name: 'Jun', value: 30 },
        { name: 'Jul', value: 40 },
        { name: 'Aug', value: 60 },
        { name: 'Sep', value: 75 },
        { name: 'Oct', value: 55 },
        { name: 'Nov', value: 80 },
        { name: 'Dec', value: 65 },
    ];

    const data = defaultData;

    const handleChange = (value) => {
        setSelectedYear(value);
    };

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <p className='text-lg font-semibold text-[#020123]'>Earnings Overview</p>
                <Select
                    defaultValue="2024"
                    style={{ width: 100 }}
                    onChange={handleChange}
                    options={items}
                    className="year-select"
                />
            </div>
            <div className='w-full h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            ticks={[0, 20, 40, 60, 80, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#020123',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#EFC11F"
                            strokeWidth={2}
                            fill="#EFC11F"
                            fillOpacity={0.9}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default IncomeOverview