import React, { useContext, useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import './Header.scss';
import Search from '../search/Search';
import { Link, withRouter } from 'react-router-dom';
import { Store } from '../../store';

const HeaderComponent = (props) => {
  const { state, dispatch } = useContext(Store);
  const [isShowSearch, setIsShowSearch] = useState(true);
  useEffect(() => {
    props.location.pathname === '/' ? setIsShowSearch(true) : setIsShowSearch(false);
  })
  return (
    <div className="header-component">
      <Link to="/">
        <h1>The New York Times Bestsellers</h1>
      </Link>
      {isShowSearch && <Search />}
      <div className="header-user-action">
        <div className="user-area">
          <Icon name='user' className="user icon" />  
          <div className="login-panel-container">
            <div className="account-button login">Giriş Yap</div>
            <div className="account-button register">Üye Ol</div>
          </div>        
        </div>
        <Link to='/your-shopping-basket' className="basket">
          <div className="shopping-area">
            <Icon name='shopping cart' className="shopping-cart icon" />
            {
              state.addedItems.length > 0 &&
              <div className="item-count">{state.addedItems.length}</div>
            }            
          </div>
        </Link>
      </div>      
    </div>
  )
}

export default withRouter(HeaderComponent);
