import React from "react";
import ReactDOM from 'react-dom';
import App from './components/App';
import CategoryBooks from './components/category_books/CategoryBooks';
import ShoppingBasket from './components/shopping-basket/ShoppingBasket';
import {StoreProvider} from './store';
import {BrowserRouter as Router,Switch, Route, Redirect} from 'react-router-dom';
import {NotificationContainer} from "react-notifications";
import './index.scss';

ReactDOM.render(
    <StoreProvider>
        <Router>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route path="/categories/:categoryName" component={CategoryBooks}></Route>
                <Route path="/your-shopping-basket" component={ShoppingBasket}></Route>
            </Switch>
        </Router>
        <NotificationContainer />
    </StoreProvider>, document.getElementById('app'));
