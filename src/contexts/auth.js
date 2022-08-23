import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem('user_token');
    const usersData = localStorage.getItem('users_data');

    if (userToken && usersData) {
      const hasUser = JSON.parse(usersData)?.filter(user => user.email === JSON.parse(userToken).email);
      
      if (hasUser) {
        setUser(hasUser[0]);
      }
    }
  }, []);

  const login = (email, password) => {
    const usersData = JSON.parse(localStorage.getItem('users_data'));
    const hasUser = usersData?.filter(user => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem('user_token', JSON.stringify({ name: hasUser[0].name, email, token }));
        setUser({ name: hasUser[0].name, email, password });
        return ;
      } else {
        return 'Неправильный логин или пароль';
      }
    } else {
      return 'Пользователь не зарегистрирован';
    }
  };

  const registration = (name, email, password) => {
    const usersData = JSON.parse(localStorage.getItem('users_data'));
    const hasUser = usersData?.filter(user => user.email === email);

    if (hasUser?.length) {
      return 'Пользователь с такой почтой уже зарегистрирован';
    }

    let newUser = {};

    if (usersData) {
      newUser = [...usersData, { name, email, password }];
    } else {
      newUser = [{ name, email, password }];
    }

    localStorage.setItem('users_data', JSON.stringify(newUser));

    return ;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_token');
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuth: !!user, login, registration, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};