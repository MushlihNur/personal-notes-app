import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import RegisterInput from "../components/RegisterInput";

function RegisterPage() {
  const navigaete = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigaete('/');
    }
  }

  return (
    <section className="register-page">
      <h2>Isi form untuk mendaftar akun.</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>Sudah punya akun? <Link to="/">Login di sini</Link></p>
    </section>
  )
}

export default RegisterPage;