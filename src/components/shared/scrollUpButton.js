import React from 'react';
import ScrollToTop from 'react-scroll-up';
import { Icon } from 'semantic-ui-react';

const ScrollUpButton = () => {
    const scrollUpBtnStyle = {
        padding: '10px 1rem',
        border: '1px solid lightgray',
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 'bold',
        backgroundColor: 'white',
        bottom: '100px'
    }
    return (
        <ScrollToTop showUnder={160} style={scrollUpBtnStyle}>
            <span><Icon name="arrow up" />Scroll Up</span>
        </ScrollToTop>
    )
}

export default ScrollUpButton;