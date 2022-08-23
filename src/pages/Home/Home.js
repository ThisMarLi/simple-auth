import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";

import "./home.css";

const Home = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home--container">
        <div className="home--header">{`Добро пожаловать, ${user.name}!`}</div>
        <Button onClick={ () => [logout(), navigate("/")] }>Выйти</Button>
      </div>
    </div>
  );
};

export default Home;