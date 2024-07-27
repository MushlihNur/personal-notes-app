import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";
import { LocaleConsumer } from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
 
    if (!error) {
      loginSuccess(data);
    }
  }
  
  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section className="login-page">
          <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Let\'s log in to use the app.'}</h2>
          <LoginInput login={onLogin}/>
          <p>{locale === 'id' ? 'Belum punya akun? ' : 'Don\'t have an account? '}
            <Link to="/register">{locale === 'id' ? 'Daftar di sini' : 'Register here'}</Link>
          </p>
        </section>
      )}
    </LocaleConsumer>
  )
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}
 
export default LoginPage;