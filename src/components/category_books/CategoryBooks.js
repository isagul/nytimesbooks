import React, { useEffect, useState } from 'react';
import { Store } from '../../store';
import axios from 'axios';
import { Dimmer, Loader, Segment, Button, Icon } from 'semantic-ui-react';
import './CategoryBooks.scss';
import firebase from '../../firebase.config';
import ScrollToTop from 'react-scroll-up';
import HeaderComponent from '../header/Header';
import FooterComponent from '../footer/Footer';


const CategoryBooks = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const [isActive, setIsActive] = useState(true);

  const scrollUpBtnStyle = {
    padding: '10px 1rem',
    border: '1px solid lightgray',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 'bold',
    backgroundColor: 'white',
    bottom: '100px'
  }

  const db = firebase.firestore();
  const auth = firebase.auth();

  useEffect(() => {
    window.scrollTo(0, 0);
    let categoryRoute = props.location.state.category.list_name_encoded;
    axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/${categoryRoute}.json`, {
      params: {
        'api-key': process.env.API_KEY
      }
    })
      .then(function (response) {
        if (response.status === 200) {
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
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection("nytimes").where("uid", "==", user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              if (doc.data().basket) {
                dispatch({
                  type: 'GET_SHOPPING_ITEMS',
                  payload: doc.data().basket
                })
              }              
            });
          })
      }
    })
  }, [])

  function addToCard(value) {
    setIsActive(true);
    dispatch({
      type: 'ADD_TO_CARD',
      payload: value
    });

    const newItemsArray = [...state.addedItems, value];
  
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection("nytimes").where("uid", "==", user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              db.collection("nytimes").doc(doc.id).update({ basket: newItemsArray });
            });
          })
      }
    })

    setTimeout(() => {
      setIsActive(false);
    }, 500);
  }

  const categoryDetail = state.categoryBooks.length > 0 &&
    state.categoryBooks.map((value, index) => {
      return (
        <div className="all-detail" key={index}>
          <p className="index-number">{index + 1}</p>
          <img className="book-image" src={`${value.book_image}`} />
          <div className="details">
            <div className="name-author">
              <h3>{value.title}</h3>
              <p><span>by </span>{value.author}</p>
            </div>
            <p className="desc">{value.description}</p>
            <Button inverted color="orange" onClick={() => addToCard(value)} className="add-to-card">
              Add To Cart
            </Button>
          </div>
        </div>
      )
    })

  return (
    <div className="category-books">
      <HeaderComponent />
      {
        isActive ?
          <Segment>
            <Dimmer active style={{ height: '100vh' }}>
              <Loader indeterminate>Loading</Loader>
            </Dimmer>
          </Segment> :
          <div className="category-detail-container">
            <h2 className="title">{props.location.state.category.display_name}</h2>
            {
              categoryDetail
            }
          </div>

      }
      <FooterComponent />
      <ScrollToTop showUnder={160} style={scrollUpBtnStyle}>
        <span><Icon name="arrow up"/>Scroll Up</span>
      </ScrollToTop>
    </div>
  )
}

export default CategoryBooks;
