import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import RegisterInput from "../components/RegisterInput";
import { LocaleConsumer } from "../contexts/LocaleContext";

function RegisterPage() {
  const navigaete = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigaete('/');
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section className="register-page">
          <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill out the form to register an account.'}</h2>
          <RegisterInput register={onRegisterHandler} />
          <p>{locale === 'id' ? 'Sudah punya akun? ' : 'Already have an account? '}
            <Link to="/">{locale === 'id' ? 'Login di sini' : 'Log in here'}</Link>
          </p>
        </section>
      )}
    </LocaleConsumer>
  )
}

export default RegisterPage;