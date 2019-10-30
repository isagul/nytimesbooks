import React, {useContext} from 'react';
import {Icon} from 'semantic-ui-react';
import './Header.scss';
import Search from '../search/Search';
import {Link} from 'react-router-dom';
import {Store} from '../../store';

const HeaderComponent = () => {
  const {state, dispatch} = useContext(Store);
  return(
    <div className="header-component">
       <Link to="/">
          <h1>The New York Times Bestsellers</h1>
       </Link>
       <Search/>
       <Link to='/your-shopping-basket'>
         <div className="shopping-area">
            <Icon name='shopping cart' className="shopping-cart"/>
            <div className="item-count">{state.addedItems.length}</div>
         </div>
       </Link>       
    </div>
  )
}

export default HeaderComponent;
