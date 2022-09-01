import { useRef, useContext } from 'react';
import ReactDom from 'react-dom';
import CartContext from '../../store/CartContext';
import Button from '../UI/Button';
import CartItems from './CartItems';
import LowestPriceImg from '../../../static/images/lowest-price.png';
import './Cart.scss'

const Cart = ({ setShowCart, isDesktop = false }) => {
  const cartRef = useRef();
  const cartContext = useContext(CartContext);

  const numOfItems = cartContext.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const totalAmount = `Rs.${cartContext.totalAmount}`;
  const hasItems = numOfItems > 0;

  const closeCart = (e) => {
    if (e.target === cartRef.current) {
      setShowCart(false);
    }
  };

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartAddRemoveHandler = (item) => {
    console.log(item);
    cartContext.addItems({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className="cart-items">
      {cartContext.items.map((item) => (
        <CartItems
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          image={item.image}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartAddRemoveHandler(item)}
        />
      ))}
    </ul>
  );

  const content = (
    <div className="cart-container" ref={cartRef} onClick={closeCart}>
      <div className="cart-modal">
        <div className="cart-head">
          <div>
            <h1>My Cart {hasItems && ((<span>{numOfItems} items</span>))}</h1>
          </div>
          <div className="cart-close">
            <button onClick={() => setShowCart(false)}>X</button>
          </div>
        </div>
        <div className="cart-body">
          {hasItems && cartItems}
          {hasItems && (
            <div className="flex cheaper-rates">
              <img
                alt="Lowest price"
                src={LowestPriceImg}
              />
              <p>You won't find it cheaper anywhere</p>
            </div>
          )}
          {!hasItems && (
            <div className='cart-empty'>
              <h2>No items in your cart</h2>
              <p>Your favorite items are just a click away</p>
            </div>
          )}
        </div>

        {hasItems && <div className="cart-footer">
          <p>Promo code can be applied on payment page</p>
          <div className='cart-button'>
            <Button title={
              <div className="cart-checkout_button">
                <span>Proceed to Checkout</span>
                <span>{`${totalAmount}`} <i className="arrow right"></i></span>

              </div>
            } />
          </div>
        </div>}
        {!hasItems && (
          <div className='footer-empty'>
            <Button title="Start Shopping" />
          </div>
        )}

      </div>
    </div>)
  return isDesktop ? ReactDom.createPortal(content, document.getElementById("portal")) : content;
};

export default Cart;