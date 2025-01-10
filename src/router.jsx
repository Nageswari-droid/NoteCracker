import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AuthRouter from "./AuthRouter";
import Revise from "./components/Revise";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthRouter>
              <Home />
            </AuthRouter>
          }
        />
        <Route
          path="/revision"
          element={
            <AuthRouter>
              <Revise />
            </AuthRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}