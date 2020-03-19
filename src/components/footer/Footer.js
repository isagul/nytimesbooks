import React from 'react';
import './Footer.scss';
import { GithubOutlined } from '@ant-design/icons';


const FooterComponent = () => {
    return (
        <div className="footer-component">
            <a href="https://github.com/isagul/nytimesbooks" target="_blank">
                <GithubOutlined className="github-icon" />
            <p>View Github Repository</p>
            </a>
        </div>
    )
}

export default FooterComponent;