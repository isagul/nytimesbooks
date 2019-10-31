import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Store} from '../../store';
import axios from 'axios';
import apiConfig from '../../config';
import { Dimmer, Loader, Segment, Button} from 'semantic-ui-react';
import './CategoryBooks.scss';
import Header from '../header/Header';


const CategoryBooks = (props) => {
    const { state, dispatch } = React.useContext(Store);
    const [isActive, setIsActive] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Loading');

    useEffect(() => {
        let categoryRoute = props.location.state.category.list_name_encoded;
        if (state.categoryBooks.length === 0) {
          axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/${categoryRoute}.json`, {
              params: {
                'api-key': apiConfig.apiKey
              }
            })
            .then(function (response) {
              if(response.status === 200) {
                  setIsActive(false);
                  dispatch({
                      type: 'SET_CATEGORY_DATA',
                      payload: response.data.results.books
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

    /*const editRouteName = route => {
        return route.toLowerCase().split(' ').join('-');
    }*/
    const addToCard = function(value){
      setIsActive(true);
      dispatch({
        type: 'ADD_TO_CARD',
        payload: value
      });
      setTimeout(() => {
        setIsActive(false);
      },500);
    }

    const categoryDetail = state.categoryBooks.length > 0 &&
    state.categoryBooks.map((value, index) => {
        return (
            <div className="all-detail" key={index}>
                <p className="index-number">{index + 1}</p>
                <img className="book-image" src={`${value.book_image}`}/>
                <div className="details">
                    <div className="name-author">
                        <h3>{value.title}</h3>
                        <p><span>by </span>{value.author}</p>
                    </div>
                    <p className="desc">{value.description}</p>
                    <Button inverted color="orange" onClick={() => addToCard(value)} className="add-to-card">
                        Add To Card
                    </Button>
                </div>
            </div>
        )
    })

    return (
        <div className="category-books">
            <Header/>
            <h1>{props.location.state.category.list_name}</h1>
            {
                isActive ?
                <Segment>
                    <Dimmer active style={{height:'100vh'}}>
                        <Loader indeterminate>{loadingMessage}</Loader>
                    </Dimmer>
                </Segment> :
                categoryDetail
            }

        </div>
    )
}

export default CategoryBooks;
