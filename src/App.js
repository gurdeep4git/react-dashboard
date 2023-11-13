import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import useToken from "./hooks/useToken";
import Products from './components/Products/Products';
import Profile from "./components/Profile/Profile";
import { URL } from "./constants/url";
function App() {
  const { setToken } = useToken();

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login setToken={setToken} />} />
        <Route path={URL.LOGIN} element={<Login setToken={setToken} />} />
        <Route path={URL.DASHBOARD} element={<Dashboard />}>
          <Route path="." element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
