import React from "react";
import PropTypes from 'prop-types';
import useInput from "../hooks/useInpus";
import { LocaleConsumer } from "../contexts/LocaleContext";

function LoginInput({ login }) {
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <form onSubmit={onSubmitHandler} className="input-login">
          <label htmlFor="email">{locale === 'id' ? 'Email' : 'Email'}</label>
          <input type="email" id="email" value={email} onChange={onEmailChangeHandler}/>
          <label htmlFor="password">{locale === 'id' ? 'Kata Sandi' : 'Password'}</label>
          <input type="password" id="password" value={password} onChange={onPasswordChangeHandler}/>
          <button type="submit">{locale === 'id' ? 'Masuk' : 'Login'}</button>
        </form>
      )}
    </LocaleConsumer>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}
 
export default LoginInput;