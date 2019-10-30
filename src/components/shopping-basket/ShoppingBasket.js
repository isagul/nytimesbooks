import React, {useContext, useState} from 'react';
import {Store} from '../../store';
import Header from '../header/Header';
import {Select} from 'semantic-ui-react';
import './ShoppingBasket.scss';

const ShoppingBasket = () => {
  const {state, dispatch} = useContext(Store);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(1);

  const countOptions = [
    { value: 1, text: '1', key:1 },
    { value: 2, text: '2', key:2 },
    { value: 3, text: '3', key:3 },
    { value: 4, text: '4', key:4 },
    { value: 5, text: '5', key:5 },
  ]

  const getBookCount = (e,{value}) => {
    console.log(value);
  }

  const items = state.addedItems.map((value,index) => {
    return (
      <div className="added-items" key={index}>
        <div className="heading">
          <p className="title">{value.title}</p>
          <p className="author">{value.contributor}</p>
        </div>
        <div className="content">
          <div className="added-items-left-side">
            <img className="book-image" src={`${value.book_image}`}/>
          </div>
          <div className="added-items-center">
            <p>Buy Online</p>
            <ul>
              {value.buy_links.map((link, index) => {
                return (
                    <li key={index}>
                      <a href={link.url} target="_blank">{link.name}</a>
                    </li>
                )
              })}
            </ul>
          </div>
          <div className="added-items-right-side">
            <Select placeholder="1" selection options={countOptions} dropdown={value} className="count-list" onChange={getBookCount} />
            <p className="price">$ {value.price}</p>
          </div>
        </div>
      </div>
    )
  });

  return (
    <div>
      <Header/>
      {items}
    </div>
  )
}

export default ShoppingBasket;
