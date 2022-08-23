import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from './hooks/useAuth';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { AuthProvider } from "./contexts/auth";

const Private = ({ Item }) => {
  const { isAuth } = useAuth();

  return isAuth > 0 ? <Item /> : <Login />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route exact path="/home" element={ <Private Item={ Home } /> } />
            <Route path="/" element={ <Private Item={ Home } /> } />
            <Route exact path="/registration" element={ <Registration /> } />
            <Route path="*" element={ <Private Item={ Home } /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
