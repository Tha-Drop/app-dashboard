import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
    return (
        <div>
            <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:'200px',
            height: '100vh',
            width: '80vw'
        }}>
            <Spin size="large" />
        </div>
        </div>
    );
};

export default Loading;