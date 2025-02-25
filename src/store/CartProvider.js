import { useReducer } from 'react';
import CartContext from './CartContext';

const defaultReducerState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {

  if (action.type === 'ADD') {
    const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCartItem = state.items[existingItemIndex];

    let updatedItems;
    if (existingCartItem) {

      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex((item) => item.id === action.id);

    const existingCartItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    }
    else {
      updatedItems = [...state.items];
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultReducerState;
};

const CartProvider = (props) => {

  const [cartState, cartActionDispatch] = useReducer(
    cartReducer,
    defaultReducerState
  );
  const addItemToCartHandler = (item) => {
    cartActionDispatch({ type: 'ADD', item });
  };

  const removeItemsToCartHandler = (id) => {
    cartActionDispatch({ type: 'REMOVE', id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemToCartHandler,
    removeItem: removeItemsToCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;