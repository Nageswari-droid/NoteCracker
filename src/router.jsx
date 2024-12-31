import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Context } from "./context/contextProvider";
import Home from "./components/Home";
import Login from "./components/Login";

const Guard = (props) => {
  const { isLoggedIn } = useContext(Context);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return props.children;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          index
          element={
            <Guard>
              <Home />
            </Guard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
