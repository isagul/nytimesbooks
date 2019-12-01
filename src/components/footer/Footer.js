import React from 'react';
import './Footer.scss';
import { Icon } from 'semantic-ui-react';


const FooterComponent = () => {
    return (
        <div className="footer-component">
            <a href="https://github.com/isagul/nytimesbooks" target="_blank">
                <Icon name='github' className="github-icon" />
            <p>View Github Repository</p>
            </a>
        </div>
    )
}

export default FooterComponent;