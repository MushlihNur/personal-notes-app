import React from "react";
import PropTypes from 'prop-types';
import useInput from "../hooks/useInpus";

function LoginInput({ login }) {
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChangeHandler}/>
      <label htmlFor="passwrod">Password</label>
      <input type="password" id="password" value={password} onChange={onPasswordChangeHandler}/>
      <button type="submit">Login</button>
    </form>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}
 
export default LoginInput;