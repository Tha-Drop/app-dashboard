
import { Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IncomeOverview = () => {
    const items = [
        {
            label: 2023,
            key: "2023",
        },
        {
            label: 2024,
            key: "2024",
        },
        {
            label: 2025,
            key: "2025",
        },
        {
            label: 2026,
            key: "2026",
        },
    ];
    const data = [
        {
            name: 'Jan',
            uv: 20,
            mt: 10,
        },
        {
            name: 'Feb',
            uv: 20,
            mt: 20,
        },
        {
            name: 'Mar',
            uv: 40,
            mt: 30,
        },
        {
            name: 'Apr',
            uv: 50,
            mt: 40,
        },
        {
            name: 'May',
            uv: 30,
            mt: 50,
        },
        {
            name: 'Jun',
            uv: 10,
            mt: 20,
        },
        {
            name: 'Aug',
            uv: 15,
            mt: 70,
        },
        {
            name: 'Sep',
            uv: 20,
            mt: 80,
        },
        {
            name: 'Nov',
            uv: 30,
            mt: 90,
        },
        {
            name: 'Dec',
            uv: 10,
            mt: 100,
        },
    ];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='ml-6'>
                    <p className='text-xl font-semibold mb-2 '>Earning Overview</p>
                    {/* <div className='flex items-center gap-5 my-2'>
                        <div>
                            <p>Yearly Growth</p>
                            <p className='font-medium'>48.08%</p>
                        </div>
                        <div>
                            <p>Monthly</p>
                            <p className='font-medium'>24.36%</p>
                        </div>
                        <div>
                            <p>Daily</p>
                            <p className='font-medium'>66.36%</p>
                        </div>
                    </div> */}
                </div>
                <Select
                    defaultValue="2024"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={items}
                />
            </div>
            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={400}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#EFC11F" opacity={1} fillOpacity={1} fill="#EFC11F" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default IncomeOverview