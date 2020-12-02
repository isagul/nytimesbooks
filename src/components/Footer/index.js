import React from 'react';
import './style.scss';
import { GithubOutlined } from '@ant-design/icons';


const FooterComponent = () => {
    return (
        <div className="footer-component">
            <a href="https://github.com/isagul/nytimesbooks" target="_blank">
                <GithubOutlined className="github-icon" />
            <p>View on GitHub</p>
            </a>
        </div>
    )
}

export default FooterComponent;