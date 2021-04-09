import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.scss';
const axios = require('axios');
import { Store } from '../store';
import { Spin } from 'antd';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import 'react-notifications/lib/notifications.css';
import ScrollUpButton from './ScrollUpButton';
import { SET_DATA } from '../constants/actions';

const App = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (state.categories.length === 0) {
      axios.get('https://api.nytimes.com/svc/books/v3/lists/names.json', {
        params: {
          'api-key': process.env.API_KEY
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            setIsActive(false);
            dispatch({
              type: SET_DATA,
              payload: response.data.results
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          //console.log('state', state);
        });
    } else {
      setTimeout(() => {
        setIsActive(false);
      }, 500)
    }
  }, []);

  return (
    <div className="app-component">
      <HeaderComponent />
      <Spin spinning={isActive} size="large">
        {props.children}
      </Spin>
      {/* <FooterComponent /> */}
      <ScrollUpButton />
    </div>
  )
}

export default App;
