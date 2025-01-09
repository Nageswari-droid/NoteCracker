import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AuthRouter from "./AuthRouter";

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
              <div>Hello, welcome!</div>
            </AuthRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}