import React from "react";
import PropTypes from 'prop-types';
import useInput from "../hooks/useInpus";

function RegisterInput({ register }) {
  const [name, onNameChangeHandler] = useInput("");
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    password !== confirmPassword ? 
    alert('Password and password confirm must be same.') :
    register({ name, email, password });
  }

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
      <label htmlFor="name">Nama</label>
      <input type="text" id="name" value={name} onChange={onNameChangeHandler}/>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChangeHandler}/>
      <label htmlFor="passwrod">Password</label>
      <input type="password" id="password" value={password} onChange={onPasswordChangeHandler}/>
      <label htmlFor="confirmPasswrod">Confirm Password</label>
      <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange}/>
      <button type="submit">Login</button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput