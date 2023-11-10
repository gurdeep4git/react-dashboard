import { Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import useToken from "./hooks/useToken";
import Header from "./components/Header/Header";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <>
      <div className="container-fluid g-0">
        <div className="row g-0">
          <div className="col-md-3">Menu</div>
          <div className="col-md-9">
            <header>
              <Header token={token} />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Products />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>

  );
}

export default App;
