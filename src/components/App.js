import React, {useState, useEffect} from 'react';
import './App.scss';
import { Dimmer, Loader, Segment} from 'semantic-ui-react'
const axios = require('axios');
import {Store} from '../store';
import HeaderComponent from './header/Header';
import FooterComponent from './footer/Footer';
import Categories from './categories/Categories';
import 'react-notifications/lib/notifications.css';

const App = () => {
    const [isActive, setIsActive] = useState(true);
    const { state, dispatch } = React.useContext(Store);

    useEffect(() => {
        if (state.categories.length === 0) {
          axios.get('https://api.nytimes.com/svc/books/v3/lists/names.json', {
              params: {
                'api-key': process.env.API_KEY
              }
            })
            .then(function (response) {
              if(response.status === 200) {
                setIsActive(false);
                  dispatch({
                      type: 'SET_DATA',
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
          },500)
        }
    },[]);

    return (
        <div className="app-component">
            <HeaderComponent/>
            {
                isActive ?
                <Segment>
                    <Dimmer active style={{height:'100vh'}}>
                        <Loader indeterminate>Loading</Loader>
                    </Dimmer>
                </Segment> :
                <Categories />
            }
            <FooterComponent />
        </div>
    )
}

export default App;
