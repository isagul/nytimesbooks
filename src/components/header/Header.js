import React, { useContext, useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import './Header.scss';
import Search from '../search/Search';
import Login from '../login/login';
import Register from '../register/register';
import { Link, withRouter } from 'react-router-dom';
import { Store } from '../../store';
import axios from 'axios';
import { GET_SHOPPING_ITEMS } from '../../constants/actions';
import firebase from '../../firebase.config';


const HeaderComponent = (props) => {
  const { state, dispatch } = useContext(Store);
  const [isShowSearch, setIsShowSearch] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignModal, setOpenSignModal] = useState(false);
  const [loggedUser, setLoggedUser] = useState("")

  const auth = firebase.auth();
  const db = firebase.firestore();

  useEffect(() => {
    props.location.pathname === '/' ? setIsShowSearch(true) : setIsShowSearch(false);
  }, []);

  useEffect(() => {
    if (Object.keys(state.loggedUser).length > 0) {
      axios.post('https://api-appnytimes.herokuapp.com/user/get-info', {
        email: state.loggedUser.email
      })
        .then(response => {
          console.log(response);
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

    /*auth.onAuthStateChanged(user => {
      if (user) {
        setLoggedUser(user.email);
        db.collection("nytimes").where("uid", "==", user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              if (doc.data().basket) {
                dispatch({
                  type: GET_SHOPPING_ITEMS,
                  payload: doc.data().basket
                })
              }              
            });
          })
      }
    })*/
  }, [state.loggedUser])

  function toggleLoginModal(value) {
    setOpenLoginModal(value);
  }

  function toggleRegisterModal(value) {
    setOpenSignModal(value);
  }

  function logoutUser(e) {
    e.preventDefault();
    auth.signOut().then(() => {
      window.location.reload();
    })
  }

  return (
    <div className="header-component">
      <Link to="/">
        <h1>The New York Times Bestsellers</h1>
      </Link>
      {isShowSearch && <Search />}
      <div className="header-user-action">
        <div className="user-area">
          <div className="user-info">
            <Icon name='user' className="user icon" />
          </div>
          {
            loggedUser.length === 0 ?
              <div className="login-panel-container">
                <div className="account-button login" onClick={() => toggleLoginModal(true)}>Login</div>
                <div className="account-button register" onClick={() => toggleRegisterModal(true)}>Sign Up</div>
              </div> :
              <div className="login-panel-container">
                <p className="user-mail">{loggedUser}</p>
                <button className="account-button logout" onClick={(e) => logoutUser(e)}>Logout</button>
              </div>
          }
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
      {
        openLoginModal && <Login modalValue={openLoginModal} toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} />
      }
      {
        openSignModal && <Register modalValue={openSignModal} toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} />
      }
    </div>
  )
}

export default withRouter(HeaderComponent);
