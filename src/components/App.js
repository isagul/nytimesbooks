import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.scss';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
const axios = require('axios');
import { Store } from '../store';
import HeaderComponent from './header/Header';
import FooterComponent from './footer/Footer';
import 'react-notifications/lib/notifications.css';
import ScrollUpButton from './shared/scrollUpButton';
import { SET_DATA } from '../constants/actions';
const Categories = lazy(() => import('./categories/Categories'));

const App = () => {
  const { state, dispatch } = React.useContext(Store);
  const [isActive, setIsActive] = useState(true)

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

  const Loading = () => {
    return (
      <Segment>
        <Dimmer active style={{ height: '100vh' }}>
          <Loader indeterminate>Loading</Loader>
        </Dimmer>
      </Segment>
    )
  }

  return (
    <div className="app-component">
      <HeaderComponent />     
      <Suspense fallback={Loading()}>
        <Categories />
      </Suspense>
      <FooterComponent />
      <ScrollUpButton />
    </div>
  )
}

export default App;
