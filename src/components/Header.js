import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import StyledLink from './UI/StyledLink';
import Cart from "./Cart/Cart";
import CartContext from "../store/CartContext";
import useWindowSize from '../services/useWindow';
import './Header.scss';
import Logo from '../../static/images/logo.png';
import Logo2x from '../../static/images/logo_2x.png';
import CartImg from '../../static/images/cart.svg';

const Header = () => {

  const navigate = useNavigate();
  const cartData = useContext(CartContext);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const { items } = cartData;

  const numOfItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const { width: windowWidth } = useWindowSize();
  useEffect(() => {
    setIsDesktop(windowWidth > 960);
  }, [windowWidth]);

  return (
    <header className="main-header">
      <nav className="flex nav">
        <Link to="/">
          <img srcSet={`${Logo} 480w,
          ${Logo2x} 800w`}
            sizes="(max-width: 600px) 190px, 280px"
            src={Logo2x}
            height="60"
            alt="Sabka Bazaar logo" />
        </Link>
        <div className="main-nav">
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/products">Products</StyledLink>
        </div>
        <div>
          <div className="secondary-nav">
            <StyledLink to="/signin">SignIn</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
          </div>
          <button
            className="btn-cart"
            onClick={isDesktop ? () => setShowCart(true) : () => navigate('/cart', { replace: true })}
          >
            <img src={CartImg} alt="cart logo" height="40" />
            <span>{numOfItems} items</span>
          </button>
          {showCart ? <Cart setShowCart={setShowCart} isDesktop={true} /> : null}
        </div>
      </nav>
    </header>
  )
}

export default Header;