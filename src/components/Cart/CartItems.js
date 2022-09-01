const CartItems = (props) => {
  const price = `Rs.${props.price}`;
  const totalPrice = `Rs.${props.price * props.amount}`;

  return (
    <li>
      <div className="cart-image">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="cart-product__details">
        <div className="cart-product__title">
          <h2>{props.name}</h2>
        </div>
        <div className="cart-item">
          <div className="cart-item__sorting">
            <button onClick={props.onRemove}>−</button>
            <span>{props.amount}</span>
            <button onClick={props.onAdd}>+</button>
            <span >{`x  ${price}`}</span>
          </div>
          <span>{totalPrice} </span>
        </div>
      </div>
    </li>
  )
}

export default CartItems