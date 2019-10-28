import React from "react";
import ReactDOM from 'react-dom';
import App from './components/App';
import {StoreProvider} from './store';

ReactDOM.render(
    <StoreProvider>
        <App/>
    </StoreProvider>, document.getElementById('app'));