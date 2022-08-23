import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./login.css";

const Login = () => {
  const { login } = useAuth();
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const inputClasses = classNames({
    "form-control--error":  error
  });

  const handleLogin = (e) => {
    if (!email || !pass) {
      setError("Введите почту и пароль");
      return ;
    }

    const res = login(email, pass);

    if (res) {
      setError(res);
      return ;
    }

    navigate("/home");
  }

  return (
    <div className="login">
      <div className="login-form">
        <div className="ligin-form--header">Вход</div>
        <div>
          <Input
            type="email"
            className={ inputClasses }
            placeholder="Введите почту"
            value={ email }
            onChange={ (e) => [setEmail(e.target.value), setError('')] }
          />
          <Input
            type="password"
            className={ inputClasses }
            placeholder="Введите пароль"
            value={ pass }
            onChange={ (e) => [setPass(e.target.value), setError('')] }
          />
          { error && <div className="login-form--error">{ error }</div> }
          <Button onClick={ handleLogin } disabled={!!error || !email || !pass} className="login-form--button">Войти</Button>
        </div>
        <p>
          Еще не зарегистрированы?
          <span className="login-form--link">
            <Link to="/registration">Зарегистрироваться</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;