import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCartOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import './Header.scss';
import Search from '../search/Search';
import Login from '../login/login';
import Register from '../register/register';
import { useHistory } from 'react-router-dom';
import { Store } from '../../store';
import axios from 'axios';
import { GET_SHOPPING_ITEMS } from '../../constants/actions';
import { SHOPPING_BASKET, FAVOURITES, HOME } from '../../constants/routes';

const HeaderComponent = (props) => {
  const { state, dispatch } = useContext(Store);
  const history = useHistory();
  const [isShowSearch, setIsShowSearch] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignModal, setOpenSignModal] = useState(false);
  const [isUserAreaShow, setIsUserAreaShow] = useState(false);
  const [loggedUser, setLoggedUser] = useState("")
  const [orderPrice, setOrderPrice] = useState(0);

  useEffect(() => {
    history.location.pathname === '/' ? setIsShowSearch(true) : setIsShowSearch(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.post('https://api-appnytimes.herokuapp.com/user/get-info', {
        email: localStorage.getItem('email')
      })
        .then(response => {
          if (response.data.status) {
            setLoggedUser(response.data.user.email);
            dispatch({
              type: GET_SHOPPING_ITEMS,
              payload: response.data.user.basket
            })
          } else {

          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [state.loggedUser])

  useEffect(() => {
    let result = state.addedItems.map(a => a.total_book_price);
    let totalPrice = result.reduce((acc, sum) => {
      return sum += acc;
    }, 0);
    setOrderPrice(totalPrice);
  }, [state])

  function toggleLoginModal(value) {
    setOpenLoginModal(value);
  }

  function toggleRegisterModal(value) {
    setOpenSignModal(value);
  }

  function logoutUser(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.reload();
  }

  function showUserArea() {
    isUserAreaShow === true ? setIsUserAreaShow(false) : setIsUserAreaShow(true);
  }

  return (
    <div className="header-component">
      <span className="project-name" onClick={() => history.push(HOME)}>The New York Times Bestsellers</span>
      {isShowSearch && <Search />}
      <div className="header-user-action">
        <HeartOutlined onClick={() => history.push(FAVOURITES)} className="favourite-icon" />
        <div className="user-area"
          onClick={showUserArea}
          onMouseOver={() => setIsUserAreaShow(true)}
          onMouseLeave={() => setIsUserAreaShow(false)}>
          <div className="user-info">
            <UserOutlined className="user icon" />
          </div>
          {
            isUserAreaShow ?
              !localStorage.getItem('token') ?
                <div className="login-panel-container">
                  <div className="account-button login" onClick={() => toggleLoginModal(true)}>Login</div>
                  <div className="account-button register" onClick={() => toggleRegisterModal(true)}>Sign Up</div>
                </div> :
                <div className="login-panel-container">
                  <p className="user-mail">{loggedUser}</p>
                  <p>Order Total: <span className="basket-total-price">${Number(orderPrice.toFixed(2))}</span></p>
                  <button className="account-button logout" onClick={(e) => logoutUser(e)}>Logout</button>
                </div> :
              <></>
          }
        </div>
        <div onClick={() => history.push(SHOPPING_BASKET)} className="basket">
          <div className="shopping-area">
            <ShoppingCartOutlined className="shopping-cart icon" />
            {
              state.addedItems.length > 0 &&
              <div className="item-count">{state.addedItems.length}</div>
            }
          </div>
        </div>
      </div>
      {openLoginModal && <Login modalValue={openLoginModal} toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} />}
      {openSignModal && <Register modalValue={openSignModal} toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} />}
    </div>
  )
}

export default HeaderComponent;
