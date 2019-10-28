import React from "react";
import ReactDOM from 'react-dom';
import App from './components/App';
import CategoryBooks from './components/category_books/CategoryBooks';
import {StoreProvider} from './store';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';

ReactDOM.render(
    <StoreProvider>
        <Router>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route path="/categories/:categoryName" component={CategoryBooks}></Route>
            </Switch>
        </Router>        
    </StoreProvider>, document.getElementById('app'));