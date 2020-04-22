import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.scss';
import { Store } from '../store';
import { Spin } from 'antd';
import HeaderComponent from './header/Header';
import FooterComponent from './footer/Footer';
import 'react-notifications/lib/notifications.css';
import ScrollUpButton from './shared/scrollUpButton';
import { SET_DATA } from '../constants/actions';

const axios = require('axios');

const App = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    async function getBookNames(){
      if (state.categories.length === 0) {
        await axios.get('https://api.nytimes.com/svc/books/v3/lists/names.json', {
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
    }
    getBookNames();
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
