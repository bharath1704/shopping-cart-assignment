import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './Login.scss';

import Input from './UI/Input';
import Button from './UI/Button';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeHandler = (evt) => {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    }
    else {
      setPassword(evt.target.value);
    }
  };

  const clickHandler = () => {
    if (email && password) {
      navigate('/');
    }
  };

  return (
    <section className="flex form-section">
      <div className='form-info'>
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlist and Recommendations</p>
      </div>
      <div className="form-fields">
        <Input
          title="Email"
          id="email"
          type="email"
          name="email"
          value={email}
          changeHandler={changeHandler}
        />
        <Input
          title="Password"
          id="password"
          type="password"
          name="password"
          value={password}
          changeHandler={changeHandler}
        />
        <Button
          title="Login"
          fullWidth
          clickHandler={clickHandler}
        />
      </div>
    </section>
  )
};

export default Login;