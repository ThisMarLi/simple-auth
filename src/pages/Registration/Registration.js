import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./registration.css";

const Registration = () => {
  const { registration } = useAuth();
  
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passConf, setPassConf] = useState('');
  const [error, setError] = useState('');

  const inputClasses = classNames({
    "form-control--error":  error
  });

  const handleLogin = (e) => {
    if (!email || !pass) {
      setError("Введите почту и пароль");
      return ;
    } else if (pass !== passConf) {
      setError("Пароли не совпадают");
      return ;
    }

    const res = registration(name, email, pass);

    if (res) {
      setError(res);
      return ;
    }
    
    clearFields();
    alert("Вы успешно зарегистрировались!");
    navigate("/");
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setPass('');
    setPassConf('');
    setError('');
  };

  return (
    <div className="registration">
      <div className="registration-form">
        <div className="registration-form--header">Регистрация</div>
        <div>
          <Input
            type="text"
            placeholder="Введите имя"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
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
          <Input
            type="password"
            className={ inputClasses }
            placeholder="Повторно введите пароль"
            value={ passConf }
            onChange={ (e) => [setPassConf(e.target.value), setError('')] }
          />
          { error && <div className="registration-form--error">{ error }</div> }
          <Button
            onClick={ handleLogin }
            disabled={ !!error || !email || !pass || !name }
            className="registration-form--button"
          >
            Зарегистрироваться
          </Button>
        </div>
        <p>
          Уже есть аккаунт?
          <span className="registration-form--link">
            <Link to="/login">Войти</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;