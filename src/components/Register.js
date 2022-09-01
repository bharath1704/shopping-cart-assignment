import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Input from './UI/Input';
import Button from './UI/Button';

const Register = () => {

  const navigate = useNavigate();
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const clickHandler = () => {
    for (let field in state) {
      if (!state[field]) {
        return;
      }
    }
    if (state['password'] !== state['confirmPassword']) {
      return;
    }
    navigate('/signin');
  };

  return (
    <section className="flex form-section">
      <div className='form-info'>
        <h1>Signup</h1>
        <p>We do not share your personal details with anyone</p>
      </div>
      <div className="form-fields">
        <Input
          title="First Name"
          id="firstName"
          type="text"
          name="firstName"
          value={state.firstName}
          changeHandler={changeHandler}
        />
        <Input
          title="Last Name"
          id="lastName"
          type="text"
          name="lastName"
          value={state.lastName}
          changeHandler={changeHandler}
        />
        <Input
          title="Email"
          id="email"
          type="email"
          name="email"
          value={state.email}
          changeHandler={changeHandler}
        />
        <Input
          title="Password"
          id="password"
          type="password"
          name="password"
          value={state.password}
          changeHandler={changeHandler}
        />
        <Input
          title="Confirm Password"
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          changeHandler={changeHandler}
        />
        <Button
          title="Signup"
          fullWidth
          clickHandler={clickHandler}
        />
      </div>
    </section>
  )
};

export default Register;