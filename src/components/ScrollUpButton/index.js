import React from 'react';
import ScrollToTop from 'react-scroll-up';
import {ArrowUpOutlined} from '@ant-design/icons'

const ScrollUpButton = () => {
    const scrollUpBtnStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        width: '40px',
        border: 'none',
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '20px',
        backgroundColor: '#f28232',
        bottom: '72px',
        color: '#fff',
        borderRadius: '50%'
    }
    return (
        <ScrollToTop showUnder={160} style={scrollUpBtnStyle}>
            <span><ArrowUpOutlined /></span>
        </ScrollToTop>
    )
}

export default ScrollUpButton;