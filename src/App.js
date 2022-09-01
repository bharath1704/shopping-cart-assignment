import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home';
import Products from "./components/Products";
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Cart from "./components/Cart/Cart"
import CartProvider from './store/CartProvider';
import { AlertContainer, alert } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import './App.scss';

const App = () => {
  return (
    <CartProvider>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home />}>
            </Route>
            <Route path="products">
              <Route index element={<Products />} />
              <Route path=":categoryParam" element={<Products />} />
            </Route>
            <Route
              path="signin"
              element={<Login />}>
            </Route>
            <Route
              path="register"
              element={<Register />}>
            </Route>
            <Route path="cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
      <AlertContainer floatingTime={5000} />
    </CartProvider>
  )
};

export default App;
