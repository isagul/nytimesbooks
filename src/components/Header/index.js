import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCartOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Search from '../Search';
import Login from '../Login';
import Register from '../Register';
import { Link, withRouter } from 'react-router-dom';
import { Store } from '../../store';
import axios from 'axios';
import { GET_SHOPPING_ITEMS } from '../../constants/actions';
import { SHOPPING_BASKET, FAVOURITES, HOME } from '../../constants/routes';
import './style.scss';

const HeaderComponent = (props) => {
  const { state, dispatch } = useContext(Store);
  const [isShowSearch, setIsShowSearch] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignModal, setOpenSignModal] = useState(false);
  const [isUserAreaShow, setIsUserAreaShow] = useState(false);
  const [loggedUser, setLoggedUser] = useState("")
  const [orderPrice, setOrderPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.location.pathname === '/' ? setIsShowSearch(true) : setIsShowSearch(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoading(true);
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
        .then(() => {
          setLoading(false);
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
      <Link to={HOME}>
        <span className="project-name">The New York Times Bestsellers</span>
      </Link>
      {isShowSearch && <Search />}
      <div className="header-user-action">
        <Link to={FAVOURITES}>
          <HeartOutlined className="favourite-icon" />
        </Link>
        <div className="user-area"
          onClick={showUserArea}
          onMouseOver={() => setIsUserAreaShow(true)}
          onMouseLeave={() => setIsUserAreaShow(false)}
        >
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
                  <Spin spinning={loading}>
                    <p className="user-mail">{loggedUser}</p>
                    <p>Order Total: <span className="basket-total-price">${Number(orderPrice.toFixed(2))}</span></p>
                    <button className="account-button logout" onClick={(e) => logoutUser(e)}>Logout</button>
                  </Spin>
                </div> :
              <></>
          }
        </div>
        <Link to={SHOPPING_BASKET} className="basket">
          <div className="shopping-area">
            <ShoppingCartOutlined className="shopping-cart icon" />
            {
              state.addedItems.length > 0 &&
              <div className="item-count">{state.addedItems.length}</div>
            }
          </div>
        </Link>
      </div>
      { openLoginModal && <Login modalValue={openLoginModal} toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} />}
      { openSignModal && <Register modalValue={openSignModal} toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} />}
    </div>
  )
}

export default withRouter(HeaderComponent);
