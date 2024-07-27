import React from "react";
import PropTypes from 'prop-types';
import useInput from "../hooks/useInpus";
import { LocaleConsumer } from "../contexts/LocaleContext";

function RegisterInput({ register }) {
  const [name, onNameChangeHandler] = useInput("");
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password harus sama.');
      return;
    }
    
    register({ name, email, password });
  }

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <form onSubmit={onSubmitHandler} className="input-login">
          <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
          <input type="text" id="name" value={name} onChange={onNameChangeHandler}/>
          <label htmlFor="email">{locale === 'id' ? 'Email' : 'Email'}</label>
          <input type="email" id="email" value={email} onChange={onEmailChangeHandler}/>
          <label htmlFor="password">{locale === 'id' ? 'Kata Sandi' : 'Password'}</label>
          <input type="password" id="password" value={password} onChange={onPasswordChangeHandler}/>
          <label htmlFor="confirmPassword">{locale === 'id' ? 'Konfirmasi Kata Sandi' : 'Confirm Password'}</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange}/>
          <button type="submit">{locale === 'id' ? 'Daftar' : 'Register'}</button>
        </form>
      )}
    </LocaleConsumer>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
