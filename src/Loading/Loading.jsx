import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            width: '100%',
        }}>
            <Spin size="large" />
        </div>
    );
};

export default Loading;