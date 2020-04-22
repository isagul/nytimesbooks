import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../store';
import './TotalBasket.scss'

const TotalBasket = () => {
  const { state, dispatch } = useContext(Store);
  const [orderPrice, setOrderPrice] = useState(0);
  let totalPrice = 0;
  
  useEffect(() => {
    let result = state.addedItems.map(a => a.total_book_price);
    let totalPrice = result.reduce((acc, sum) => {
      return sum += acc;
    }, 0);
    setOrderPrice(totalPrice);
  }, [state])

  return (
    <div className="total-basket">
      <h2 className="title">Order Summary</h2>
      <div className="basket-summary">
        <div>
          <p>Subtotal ({state.addedItems.length} items)</p>
          <p>${Number(orderPrice.toFixed(2))}</p>
        </div>
        <div>
          <p>Estimated Shipping</p>
          <p>Free</p>
        </div>
        <div>
          <p>Estimated Tax</p>
          <p>$0.00</p>
        </div>
      </div>
      <div className="order-total">
        <p>Order Total: </p>
        <p>${Number(orderPrice.toFixed(2))}</p>
      </div>

      <button className="checkout">Checkout</button>
    </div>
  )
}

export default TotalBasket;
