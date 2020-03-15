import React from "react";
import ReactDOM from 'react-dom';
import App from './components/App';
import CategoryBooks from './components/category_books/CategoryBooks';
import ShoppingBasket from './components/shopping-basket/ShoppingBasket';
import {StoreProvider} from './store';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import {NotificationContainer} from "react-notifications";
import {CATEGORIES_NAME, HOME, SHOPPING_BASKET} from './constants/routes';
import './index.scss';
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
                <Route exact path={HOME} component={App}></Route>
                <Route exact path={CATEGORIES_NAME} component={CategoryBooks}></Route>
                <Route exact path={SHOPPING_BASKET} component={ShoppingBasket}></Route>
            </Switch>
        </Router>
        <NotificationContainer />
    </StoreProvider>, document.getElementById('app'));


