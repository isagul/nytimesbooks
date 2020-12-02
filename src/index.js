import React from "react";
import ReactDOM from 'react-dom';
import {StoreProvider} from './store';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import {NotificationContainer} from "react-notifications";
import {CATEGORIES_NAME, HOME, SHOPPING_BASKET, FAVOURITES} from './constants/routes';
import CategoryBooks from './views/CategoryBooks';
import ShoppingBasket from './views/ShoppingBasket';
import Favourites from './views/Favourites';
import Categories from './views/Categories';
import './index.scss';
import 'antd/dist/antd.css';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';


if('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker
    //     .register('./service-worker.js')
    //     .then(registration => console.log('SW registered: ', registration))
    //     .catch(registrationError => console.log('SW registration failed: ', registrationError))
    // })
    const registration = runtime.register();
    registration
    .then(reg => reg)
    .catch(err => console.log(err))
}

ReactDOM.render(
    <StoreProvider>
        <Router>
            <Switch>
                <Route exact path={HOME} component={Categories}></Route>
                <Route exact path={CATEGORIES_NAME} component={CategoryBooks}></Route>
                <Route exact path={SHOPPING_BASKET} component={ShoppingBasket}></Route>
                <Route exact path={FAVOURITES} component={Favourites}></Route>
            </Switch>
        </Router>
        <NotificationContainer />
    </StoreProvider>, document.getElementById('app'));


